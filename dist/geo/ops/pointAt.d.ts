import { Shape, Vec2 } from '../types';
/**
 * Samples and returns point on the boundary of given 2D shape at normalized
 * parametric distance `t`. If the shape is closed, t=0 and t=1 yield the same
 * result.
 *
 * @param shape
 * @param t
 */
export declare function pointAt(shape: Shape, t: number): Vec2;
