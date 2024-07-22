import { Shape } from '../types';
/**
 * Performs intersection tests on given 2 shapes and returns the intersection point(s) or a boolean for simple overlap checks.
 *
 * @param {Shape} a - The first shape.
 * @param {Shape} b - The second shape.
 * @returns {boolean|Array|null} - Returns a boolean for circle-circle intersection, an array with the intersection point for ray-line intersection, or null if no intersection.
 */
export declare function intersects(a: Shape, b: Shape): boolean | number[] | number[][] | null;
