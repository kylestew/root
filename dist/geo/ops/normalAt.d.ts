import { Shape } from '../types';
/**
 * Calculates the normal vector at a given point on a shape.
 * @param {Shape} shape - The shape to calculate the normal vector for.
 * @param {number} t - The parameter value representing the point on the shape.
 * @returns {number[]} The normal vector at the given point on the shape.
 * @throws {Error} If the method is not implemented for the given shape.
 */
export declare function normalAt(shape: Shape, t: number): number[];
