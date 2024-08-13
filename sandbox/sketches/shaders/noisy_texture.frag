#version 300 es
precision highp float;

in vec2 vTexCoord;

uniform sampler2D tex0;
uniform float time;

void drawGrid(vec2 st, inout vec3 pixel) {
    const float tickWidth = 0.1;
    vec3 gridColor = vec3(0.5);
    if (mod(st.x, tickWidth) < 0.002) pixel = gridColor;
    if (mod(st.y, tickWidth) < 0.002) pixel = gridColor;

    vec3 axesColor = vec3(1, 1, 1);
    if (abs(st.x) < 0.004) pixel = axesColor;
    if (abs(st.y) < 0.004) pixel = axesColor;
}

//	Simplex 3D Noise
//	by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

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

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0);
    vec4 p = permute(
        permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
        i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0 / 7.0;  // N=7
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);  // mod(j,N)

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// Function to generate a random value based on a seed
float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }

out vec4 fragColor;

void main() {
    float zOffset = time * 0.0005;

    // offset UVs to remove sharp edges
    float randomScale = 0.015;
    vec2 noisyUv =
        vTexCoord +
        vec2(random(vTexCoord + zOffset), random(vTexCoord + 0.12345 + zOffset)) * randomScale;
    vec4 color = texture(tex0, noisyUv);

    // offset color based on noise to break up solid color areas
    float noiseScale = 0.2;
    float noiseMult = 4.0;  // higher means more repeats of the noise field
    vec3 noiseColor = vec3(snoise(vec3(noisyUv * noiseMult, 1.2345 + zOffset)) * 0.5 + 0.5,
                           snoise(vec3(noisyUv * noiseMult, 2.9273 + zOffset)) * 0.5 + 0.5,
                           snoise(vec3(noisyUv * noiseMult, 3.7029 + zOffset)) * 0.5 + 0.5);
    noiseColor *= noiseScale;

    // add colored noise
    color.rgb += noiseColor;

    // add greyscale noise
    // color.rgb += noiseColor.r;

    fragColor = color;
}