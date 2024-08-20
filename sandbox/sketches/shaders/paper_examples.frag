#version 300 es
precision highp float;

in vec2 vTexCoord;

uniform sampler2D noiseTex;
uniform sampler2D canvasTex;

out vec4 fragColor;

//--- pickup functions

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

float mod289(float x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }

float permute(float x) { return mod289(((x * 34.0) + 1.0) * x); }

vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;  // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;       // -1.0+3.0*C.x = -0.5 = -D.y

    // Permutations
    i = mod289(i);
    vec4 p = permute(
        permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
        i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857;  // 1.0/7.0
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);  // mod(j,N)

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    // vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
    // vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0, 0, 0, 0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    // Normalise gradients
    vec4 norm = 1.79284291400159 -
                0.85373472095314 * vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbmNoise(vec2 p) {
    return texture(noiseTex, p * .001).x * .533 +  //
           texture(noiseTex, p * .01).x * .267 +   //
           texture(noiseTex, p * .3).x * .133 +    //
           texture(noiseTex, p * .5).x * .067;
}

float fbm(vec2 uv, int oct, float time) {
    vec2 pos = uv;
    float amp = 1.0;
    float val = 0.0;

    for (int i = 0; i < oct; i++) {
        val += amp * snoise(vec3(pos, time));
        pos *= 2.0;
        amp *= 0.5;
    }
    return val;
}

// === Procedural Paper Texture ================================================
float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}
float hashPaper(vec2 U) {  // https://www.shadertoy.com/view/ss2Xzh
    float h = .005 * (sin(.6 * U.x + .1 * U.y) + sin(.7 * U.y - .1 * U.x));
    for (float x = -1.; x <= 1.; x++)
        for (float y = -1.; y <= 1.; y++) {
            h += .15 * .125 * hash(U + vec2(x, y));
        }
    return h;
}
// =============================================================================

// === Washi Paper Texture =====================================================
// https://www.shadertoy.com/view/fdt3RN
float washi(vec2 uv) {
    int oct = 16;
    float seed = 0.;
    float noise = fbm(uv, oct, seed);
    float l = length(vec2(dFdx(noise), dFdy(noise)));
    l = mix(pow(l, 0.5), 1.0, 0.7);
    return l;
}
// =============================================================================

// === Simple Dusty Texture ====================================================
float dust(vec2 uv) {
    float dust = 0.9;
    // monkey around with values below to dial in dust

    // darken
    dust = mix(dust, dust * .7, texture(noiseTex, uv * 3.).x * 0.5);

    // lighten back up
    dust += texture(noiseTex, (uv + vec2(.125, .382)) * 5.).x * .2;

    return dust;
}
// =============================================================================

// === Watercolor Fill =========================================================
float watercolor(vec2 p) {
    p *= 5.;
    vec2 q = vec2(0.);
    q.x = fbmNoise(p);
    q.y = fbmNoise(p + vec2(1.0));
    vec2 r = vec2(0.);
    r.x = fbmNoise(p + 1.0 * q + vec2(1.7, 9.2));
    r.y = fbmNoise(p + 1.0 * q + vec2(8.3, 2.8));
    float f = fbmNoise(p + r);
    return clamp(f, 0., 1.);
}
// =============================================================================

void main() {
    // pixel coordinates
    vec2 coord = gl_FragCoord.xy;

    // uv coordinates (flipped)
    vec2 uv = vec2(vTexCoord.x, 1.0 - vTexCoord.y);

    // monkey around with UVs for hand drawn effect
    vec2 tex_uv = uv;
    tex_uv -= 0.07 * (vec2(fbmNoise(uv * 8.), fbmNoise(uv * 8. + .35)) - .5);
    // TODO: smoother warp

    // sample incoming canvas texture
    // canvas is expected to be on a transparent background
    vec4 tex = texture(canvasTex, tex_uv);

    // screenprint effect
    // remove some of the canvas texture by reducing its alpha before composite
    // tex.a -= mix(0.0, tex.a, 1.0 - (fbmNoise(uv * 12.) * 1.5 - 0.01));

    // == Watercolor Fill =============
    tex.rgb = mix(vec3(1.), tex.rgb, watercolor(uv));
    // ================================

    // composite texture onto white background
    vec3 col = mix(vec3(1.0), tex.rgb, tex.a);

    // == sketchy effect ==============
    // (masked to alpha)
    // vec3 sketchColor = vec3(0.2);
    // float sketchStrength = 0.5;
    // col =
    //     mix(col, mix(sketchColor, col, 1. - texture(noiseTex, uv * 10.).x * sketchStrength),
    //     tex.a);
    // ================================

    vec3 paperColor = vec3(1.0, 0.92, 0.96);

    // == Procedural Paper ============
    vec3 paper = paperColor * vec3(0.8 + hashPaper(coord));
    // ================================

    // == Dusty Paper =================
    // vec3 paper = paperColor * vec3(dust(uv));
    // ================================

    // == Washi =======================
    // vec3 paper = paperColor * vec3(washi(uv));
    // ================================

    // apply paper
    col = col * paper;

    fragColor = vec4(col, 1.0);
}
