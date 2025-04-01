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
export declare function fbm2D(x: number, y: number, scale?: number, octaves?: number, persistance?: number, lacunarity?: number): number;
