#version 300 es
precision highp float;

in vec2 vTexCoord;

uniform sampler2D noiseTex;
uniform sampler2D canvasTex;

out vec4 fragColor;

float fbmNoise(vec2 p) {
    return texture(noiseTex, p * .001).x * .533 +  //
           texture(noiseTex, p * .01).x * .267 +   //
           texture(noiseTex, p * .3).x * .133 +    //
           texture(noiseTex, p * .5).x * .067;
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
// TODO: make screenprint effect instead
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
    tex_uv -= 0.01 * (vec2(fbmNoise(uv * 8.), fbmNoise(uv * 8. + .35)) - .5);

    // sample incoming canvas texture
    // canvas is expected to be on a transparent background
    vec4 tex = texture(canvasTex, tex_uv);

    // == Screenprint =================
    // remove some of the canvas texture by reducing its alpha before composite
    // tex.a -= mix(0.0, tex.a, 1.0 - (0.2 + (fbmNoise(uv * 108.) * 1.0 - 0.01)));
    // tex.rgb = mix(vec3(1.0), tex.rgb, 0.5 + 0.5 * watercolor(uv));
    // ================================

    // composite texture onto white background
    vec3 col = mix(vec3(1.0), tex.rgb, tex.a);

    // == Procedural Paper ============
    vec3 paperColor = vec3(1.0, 0.92, 0.96);
    vec3 paper = paperColor * vec3(0.8 + hashPaper(coord));
    // apply paper
    col = col * paper;
    // ================================

    fragColor = vec4(col, 1.0);
}
