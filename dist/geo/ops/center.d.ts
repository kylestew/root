import { Shape, Vec2 } from '../types';
/**
 * Returns copy of given shape centered around optionally provided point `p`
 * (default: shape centroid).
 *
 * @param shape
 * @param p
 */
export declare function center(shape: Shape, p: Vec2): Vec2 | Shape;
