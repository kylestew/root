import { Vec2 } from '../geo/types';
/**
 * Generates a Chaikin curve based on the given points and number of iterations.
 *
 * @param {Array} points - The input points for the curve.
 * @param {number} iterations - The number of iterations to perform.
 * @param {boolean} closed - Whether the polygon is closed or not.
 * @returns {Array} The generated Chaikin curve as an array of points.
 */
export declare function chaikinCurve(points: Vec2[], iterations: number, closed?: boolean): Vec2[];
