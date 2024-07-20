import { Shape, Vec2 } from '../types';
/**
 * Extracts/samples vertices from given shape's boundary and returns them as array.
 *
 * @example
 * ```ts
 * import { circle, vertices } from "@thi.ng/geom";
 *
 * // using default
 * asPoints(circle(100))
 *
 * // specify resolution only
 * asPoints(circle(100), 6)
 *
 * // specify more advanced options
 * asPoints(circle(100), { dist: 10 })
 * ```
 *
 * @param geo
 * @param num - number of vertices to sample (if not specified, uses default resolution per shape)
 */
export declare function asPoints(geo: Shape, num?: number): Vec2[];
