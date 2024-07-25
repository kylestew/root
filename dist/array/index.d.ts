/**
 * === Array Utils ===
 *
 * full(count, callbackOrValue) - Prefills a new array with values returned by a callback function or a provided value.
 * linspace(start, stop, num, endpoint) - Generates an array of numbers within a specified range.
 * range(from, to, step) - Generates an array of numbers within a specified range.
 * range2d(xRange, yRange, stepX, stepY) - Generates a 2D range array based on the given x and y ranges.
 * partition(data, size, step, partial) - Creates overlapping and non-overlapping sliding windows of inputs.
 * wrapSides(src, numLeft, numRight) - Wraps elements from the start and end of an array to the other side.
 * shuffle(array) - Shuffles the elements of an array in place.
 * interleave(array1, array2) - Interleaves two arrays by alternating their elements.
 * zip(arr1, arr2) - Zips two arrays together, creating an array of pairs.
 * rotate(array, positions) - Rotates an array by a given number of positions.
 * takeEvery(array, n) - Takes every nth element from an array and returns a new array.
 * takePieces(array: any[], size: number) - Splits an array into smaller arrays of size N.
 * randomRemove(array: any[], percentToRemove: number) - Removes a random number of elements from an array.
 */
/**
 * Prefills a new array with values returned by a callback function or a provided value.
 *
 * @param {number} count - The number of elements to prefill the array with.
 * @param {Function|any} callbackOrValue - The callback function or value that returns the value for each element.
 * @returns {Array} - The prefilled array.
 */
export declare function full(count: number, callbackOrValue: Function | any): any[];
/**
 * Generates N evenly spaced numbers within a specified range.
 *
 * @param {number} start - The starting value of the range.
 * @param {number} stop - The ending value of the range.
 * @param {number} num - The number of elements in the range.
 * @param {boolean} [endpoint=true] - Whether or not to include the endpoint in the range.
 * @returns {Array} - The generated range array.
 */
export declare function linspace(start: number, stop: number, num: number, endpoint?: boolean): number[];
/**
 * Generates an array of numbers within a specified range using a step size.
 *
 * @param {number} from - The starting number of the range.
 * @param {number} to - The ending number of the range.
 * @param {number} [step=1] - The increment value between numbers in the range.
 * @returns {number[]} - An array of numbers within the specified range.
 * @throws {Error} - If the step size is not positive.
 */
export declare function range(from: number, to: number, step?: number): number[];
/**
 * Creates overlapping and non-overlapping sliding windows
 * of inputs. Window size and progress speed can be configured via
 * `size` and `step`. By default only full / complete partitions are
 * emitted.
 *
 * @example
 * ```ts
 *
 * [...partition(3, range(10))]
 * // [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ] ]
 *
 * [...partition(3, true, range(10))]
 * // [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 9 ] ]
 *
 * [...partition(3, 1, range(10))]
 * // [ [ 0, 1, 2 ],
 * //   [ 1, 2, 3 ],
 * //   [ 2, 3, 4 ],
 * //   [ 3, 4, 5 ],
 * //   [ 4, 5, 6 ],
 * //   [ 5, 6, 7 ],
 * //   [ 6, 7, 8 ],
 * //   [ 7, 8, 9 ] ]
 * ```
 *
 * @param size -
 * @param step -
 * @param partial -
 */
export declare function partition(data: any[], size: number, step?: number, partial?: boolean): any[];
/**
 * Wraps elements from the start and end of an array to the other side.
 * @param {Array} src - The source array.
 * @param {number} numLeft - Number of elements to wrap from the right end to the start.
 * @param {number} numRight - Number of elements to wrap from the left end to the end.
 * @returns {Array} - The new array with wrapped elements.
 */
export declare function wrapSides(src: any[], numLeft?: number, numRight?: number): any[];
/**
 * Returns a copied array with its elements shuffled.
 *
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - The shuffled array (copied).
 */
export declare function shuffle(array: any[]): any[];
/**
 * Interleaves two arrays by alternating their elements.
 * @param {Array} array1 - The first array.
 * @param {Array} array2 - The second array.
 * @returns {Array} - The interleaved array.
 */
export declare function interleave(array1: any[], array2: any[]): any[];
/**
 * Zips multiple arrays together, creating an array of tuples.
 * Stops at the shortest array length when arrays are uneven.
 *
 * @param {...any[]} arrays - The arrays to zip together.
 * @returns {any[]} - The zipped array.
 */
export declare function zip(...arrays: any[]): any[][];
/**
 * Rotates an array by a given number of positions.
 *
 * @param {Array} array - The array to be rotated.
 * @param {number} positions - The number of positions to rotate the array. Positive values rotate to the right, negative values rotate to the left.
 * @returns {Array} - The rotated array.
 */
export declare function rotate(array: any[], positions: number): any[];
/**
 * Takes every nth element from an array and returns a new array (copies array).
 *
 * @param {Array} array - The input array.
 * @param {number} n - The number of elements to skip between each selected element.
 * @returns {Array} - A new array containing every nth element from the input array.
 */
export declare function takeEvery(array: any[], n: number): any[];
/**
 * Splits an array into smaller arrays of size N.
 *
 * @param {Array} array - The array to be split.
 * @param {number} size - The size of each smaller array.
 * @returns {Array} - An array of smaller arrays.
 */
export declare function takePieces(array: any[], size: number): any[][];
/**
 * Removes a percentage of elements from an array.
 *
 * @param {any[]} array - The array from which elements will be removed.
 * @param {number} percentToRemove - The percentage of elements to remove. [0, 1]
 * @returns {any[]} - A new array with the randomly selected elements removed.
 */
export declare function randomRemove(array: any[], percentToRemove: number): any[];
