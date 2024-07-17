#version 300 es
precision highp float;

in vec2 vTexCoord;
uniform sampler2D tex0;
uniform sampler2D tex1;

uniform mat3 canvasTransform;
uniform vec2 center;
uniform float angle;
uniform float smoothness;
uniform bool invert;
uniform float canvasScale;

out vec4 fragColor;

// Function to generate a random value based on a seed
float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;
}

void main() {
    // recreate canvas coordinate system in shader
    vec2 st = (canvasTransform * vec3(vTexCoord, 1.0)).xy;

    // calculate the vector from the center to the current canvas coordinate
    vec2 dir = st - center;

    // Rotate this vector by the given angle
    // make the dividing line a bit uneven
    vec2 rotatedDir = rotate(dir, -angle) + 0.01 * (cos(3.5 * st) + sin(4.5 * st + 0.123));

    // Calculate the blend factor using smoothstep
    // noise up the line a bit so its not the only perfect line in the place
    float blendFactor = smoothstep(-smoothness, smoothness, rotatedDir.y + 0.005 * random(st));

    // Sample both textures
    vec2 flippedCoord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);  // openGL flips the Y coordinate

    float noiseAmount = 0.0025;
    vec2 dust = vec2(random(flippedCoord), random(flippedCoord + 1.2345)) * noiseAmount;
    vec2 dustUv = flippedCoord + dust;

    vec4 color0 = texture(tex0, dustUv);
    vec4 color1 = texture(tex1, dustUv);

    // noise up the color
    float colorNoise = 0.04;
    color0 += random(flippedCoord) * colorNoise;
    color1 += random(flippedCoord) * colorNoise;

    // Mix the two textures based on the blend factor (combine split)
    vec4 finalColor = mix(color1, color0, blendFactor);

    if (invert) {
        fragColor = vec4(1.0 - finalColor.rgb, finalColor.a);
    } else {
        fragColor = finalColor;
    }
}
