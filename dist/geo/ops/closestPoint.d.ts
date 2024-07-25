import { Shape, Vec2 } from '../types';
/**
 * Finds the closest point on a shape to a given point.
 *
 * @param {Shape} shape - The shape to find the closest point on.
 * @param {Vec2} pt - The point to find the closest point to.
 * @returns {Vec2} The closest point on the shape to the given point.
 * @throws {Error} If the method is not implemented for the given shape.
 */
export declare function closestPoint(shape: Shape, pt: Vec2): Vec2;
