/**
 * Performs linear interpolation between two numbers.
 * @param a - The starting value.
 * @param b - The ending value.
 * @param t - The interpolation factor, ranging from 0 to 1.
 * @returns The interpolated value between `a` and `b`.
 */
export declare function lerp(a: number, b: number, t: number): number;
/**
 * Maps a value from one range to another range.
 *
 * @param {number} value - The value to be mapped.
 * @param {number} low1 - The lower bound of the input range.
 * @param {number} high1 - The upper bound of the input range.
 * @param {number} low2 - The lower bound of the output range.
 * @param {number} high2 - The upper bound of the output range.
 * @returns {number} The mapped value.
 */
export declare function mapRange(value: number, low1: number, high1: number, low2: number, high2: number): number;
