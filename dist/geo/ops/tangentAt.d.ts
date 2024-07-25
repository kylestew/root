import { Shape } from '../types';
/**
 * Computes tangent on shape/boundary at normalized parametric position `t`.
 *
 * @param shape
 * @param t
 */
export declare function tangentAt(shape: Shape, t: number): number[];
