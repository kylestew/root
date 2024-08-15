#version 300 es
precision highp float;

in vec2 vTexCoord;

uniform sampler2D noiseTex;

out vec4 fragColor;

// === SDF Functions ==========================================================
float cir(vec2 p, vec2 c, float r, float w) { return abs(length(p - c) - r) - w; }
// ============================================================================

float fbm(vec2 p) {
    return texture(noiseTex, p * .001).x * .533 +  //
           texture(noiseTex, p * .01).x * .267 +   //
           texture(noiseTex, p * .3).x * .133 +    //
           texture(noiseTex, p * .5).x * .067;
}

void main() {
    vec2 uv = gl_FragCoord.xy;

    float d = fbm(uv);
    vec3 col = vec3(d);

    // fragColor = fbm(uv);
    // fragColor = vec4(color, 1.0);

    fragColor = vec4(col, 1.0);
}
