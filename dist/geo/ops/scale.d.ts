import { Shape } from '../types';
import { Circle, Ellipse, Polygon, Polyline } from '../index';
/**
 * Scales given shape uniformly or non-uniformly by given `factor`.
 *
 * @remarks
 * Scaling non-uniformly might result in different result types, e.g.
 * {@link Circle} => {@link Ellipse}.
 *
 * @param shape
 * @param factor - single number or [sx, sy] vector
 */
export declare function scale(shape: Shape, factor: number): Circle | Ellipse | Polygon | Polyline;
