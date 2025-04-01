import { simplex2 } from './noise';
/**
 * Generates 2D Fractal Brownian Motion noise by layering multiple octaves of simplex noise
 * @param {number} x - X coordinate to sample
 * @param {number} y - Y coordinate to sample
 * @param {number} scale - Base frequency scale. Higher values = more zoomed out noise
 * @param {number} octaves - Number of noise layers to combine
 * @param {number} persistance - How quickly amplitude decreases per octave (0-1)
 * @param {number} lacunarity - How quickly frequency increases per octave (typically 2)
 * @returns {number} Combined noise value between 0 and 1
 */
export function fbm2D(x, y, scale = 1.0, octaves = 4, persistance = 0.5, lacunarity = 2.0) {
    let amplitude = 1.0;
    let frequency = scale;
    let height = 0.0;
    let maxAmplitude = 0.0;
    for (let i = 0; i < octaves; i++) {
        height += simplex2(x * frequency, y * frequency) * amplitude;
        maxAmplitude += amplitude;
        amplitude *= persistance;
        frequency *= lacunarity;
    }
    return height / maxAmplitude;
}
//# sourceMappingURL=fbm.js.map