#version 300 es
precision highp float;

in vec2 vTexCoord;

uniform sampler2D noiseTex;
uniform sampler2D tex0;

out vec4 fragColor;

// === Procedural Paper Texture ================================================
float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}
float hashPaper(vec2 U) {  // https://www.shadertoy.com/view/ss2Xzh
    float h = .005 * (sin(.6 * U.x + .1 * U.y) + sin(.7 * U.y - .1 * U.x));
    for (float x = -1.; x <= 1.; x++) {
        for (float y = -1.; y <= 1.; y++) {
            h += .15 * .125 * hash(U + vec2(x, y));
        }
    }
    return h;
}
// =============================================================================

// === Washi Paper Texture =====================================================

// #define PAPER_COLOR vec3(1.0, 0.9, 0.93)

// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
//     float minRes = min(iResolution.x,iResolution.y);
//     vec2 uv = (fragCoord*2.0-0.5)/minRes;
//     int oct = 16;
//     float seed = 0.;
//     float noise = fbm(uv, oct, seed);
//     float l = length(vec2(dFdx(noise), dFdy(noise)));
//     l = mix(pow(l,0.5),1.0, 0.7);

//     vec3 col = PAPER_COLOR * l;

//     fragColor = vec4(col,1.0);
// }

// =============================================================================

// === Simple Dusty Texture ====================================================
float fbm(vec2 p) {
    return texture(noiseTex, p * .001).x * .533 +  //
           texture(noiseTex, p * .01).x * .267 +   //
           texture(noiseTex, p * .3).x * .133 +    //
           texture(noiseTex, p * .5).x * .067;
}
// =============================================================================

void main() {
    // pixel coordinates
    vec2 coord = gl_FragCoord.xy;

    // uv coordinates
    vec2 uv = vTexCoord.xy;
    // monkey around with UVs for hand drawn effect
    vec2 wuv = uv - 0.03 * (vec2(fbm(uv * 8.), fbm(uv * 8. + .35)) - .5);

    // sample incoming canvas texture
    vec3 col = texture(tex0, wuv).rgb;
    // optionally wash out the color with white noise
    col = mix(vec3(1.0), col, 1. - texture(noiseTex, uv * 4.).x * 0.3);

    // == Procedural Paper ============
    vec3 paper = vec3(0.8 + hashPaper(coord));
    // ================================

    // == Dusty Paper =================
    // vec3 paper = vec3(0.9);
    // // monkey around with values below to dial in dust
    // // darken
    // paper = mix(paper, paper * .7, texture(noiseTex, uv * 3.).x * 0.5);
    // // lighten back up
    // paper += texture(noiseTex, (uv + vec2(.125, .382)) * 5.).x * .2;
    // ================================

    // == Washi =======================
    // ================================

    col = col * paper;
    fragColor = vec4(col, 1.0);
}
