import { Vec2 } from '../geo/types';
/**
 * === RANDOM UTILS ===
 *
 * random(min, max) - Generates a random number between the specified minimum and maximum values.
 * randomInt(min, max) - Generates a random integer between the specified minimum and maximum values.
 * pickRandom(arr, num) - Picks a random unique element or elements from an array.
 * randomPoint(min, max) - Generates a random point within a specified range.
 * randomOffset(maxX, maxY) - Generates a random offset within the specified range.
 * weightedRandom(weights) - Generates a random index from an array of weights.
 * gaussian(mean, stdDev) - Calculates a random number from a Gaussian distribution.
 */
/**
 * Generates a random number between the specified minimum and maximum values.
 * If only one argument is provided, it is assumed to be the maximum value and the minimum value is set to 0.
 *
 * @param {number} [min=0] - The minimum value (inclusive). Defaults to 0 if not provided.
 * @param {number} [max=1] - The maximum value (exclusive). Defaults to 1 if not provided.
 * @returns {number} - A random number between min and max.
 */
export declare function random(min?: number, max?: number): number;
/**
 * Generates a random integer between the specified minimum and maximum values.
 * The minimum value is inclusive, while the maximum value is exclusive.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} The random integer generated.
 */
export declare function randomInt(min: number, max: number): number;
/**
 * Generates a random boolean value.
 *
 * @returns {boolean} A random boolean value.
 */
export declare function randomBool(): boolean;
/**
 * Picks a random unique element or elements from an array.
 *
 * @param {any[]} arr - The array to pick elements from.
 * @param {number} [num=1] - The number of elements to pick. Defaults to 1 if not provided.
 * @returns {Array} - An array containing the randomly picked unique element(s).
 */
export declare function pickRandom(arr: any[], num?: number): any;
/**
 * Generates a random point within a specified range.
 *
 * @param {[number, number]} [min=[0, 0]] - The minimum values for x and y coordinates.
 * @param {[number, number]} [max=[1, 1]] - The maximum values for x and y coordinates.
 * @returns {[number, number]} The randomly generated point as an array of [x, y] coordinates.
 */
export declare function randomPoint(min?: [number, number], max?: [number, number]): Vec2;
/**
 * Generates a random offset within the specified range.
 *
 * @param {number} maxX - The maximum value for the X-axis.
 * @param {number} [maxY=maxX] - The maximum value for the Y-axis. If not provided, it defaults to the value of maxX.
 * @returns {number[]} An array containing the random X and Y offsets.
 */
export declare function randomOffset(maxX: number, maxY: number): number[];
/**
 * Generates a random element from a target array based on an array of weights.
 *
 * @param {any[]} targetArray - The array of elements to pick from.
 * @param {any[]} weights - The array of weights.
 *
 * @returns {any} - The selected element from the target array.
 * @throws {Error} - If the lengths of the target array and weights array do not match.
 */
export declare function weightedRandom(targetArray: any[], weights: any[]): any;
/**
 * Calculates a random number from a Gaussian distribution.
 *
 * @param {number} mean - The mean value of the distribution.
 * @param {number} stdDev - The standard deviation of the distribution.
 * @returns {number} The random number from the Gaussian distribution.
 */
export declare function gaussian(mean: number, stdDev: number): number;
/**
 * Generates a random number following the Pareto distribution.
 * @param {number} xm - The minimum possible value (scale parameter).
 * @param {number} alpha - The shape parameter.
 * @returns {number} - A random number following the Pareto distribution.
 */
export declare function pareto(xm: number, alpha: number): number;
