import { Vec2 } from '../geo/types';
import { Rectangle } from '../geo/index';
/**
 * Performs linear interpolation between two numbers.
 * @param a - The starting value.
 * @param b - The ending value.
 * @param t - The interpolation factor, ranging from 0 to 1.
 * @returns The interpolated value between `a` and `b`.
 */
export declare function lerp(a: number, b: number, t: number): number;
/**
 * Linearly interpolates between two points.
 *
 * @param {number[]} pt1 - The first point.
 * @param {number[]} pt2 - The second point.
 * @param {number} pct - The interpolation percentage (between 0 and 1).
 * @returns {number[]} The interpolated point.
 */
export declare function lerpPt(pt1: Vec2, pt2: Vec2, pct: number): number[];
/**
 * Calculates the midpoint between two points.
 *
 * @param {number[]} pt1 - The first point, represented as an array of two numbers.
 * @param {number[]} pt2 - The second point, represented as an array of two numbers.
 * @returns {number[]} The midpoint between pt1 and pt2, represented as an array of two numbers.
 */
export declare function midPt(pt1: Vec2, pt2: Vec2): number[];
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
/**
 * Maps a set of points from the range [0, 1] to a rectangle defined by its position and maximum coordinates.
 * Optionally, clips the points to stay within the rectangle.
 *
 * @param pts - An array of points to be mapped.
 * @param rect - The rectangle to map the points to.
 * @param clip - Optional. If true, points outside the rectangle will be dropped. Default is false.
 * @returns An array of mapped points, filtered to remove any dropped points if clipping is enabled.
 */
export declare function map01toRect(pts: Vec2[], rect: Rectangle, clip?: boolean): number[][];
