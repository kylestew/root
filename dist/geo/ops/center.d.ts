import { Shape, Vec2 } from '../types';
import { Circle, Line, Polygon, Polyline, Rectangle } from '../index';
/**
 * Returns copy of given shape centered around optionally provided point `p`
 * (default: shape centroid).
 *
 * @param shape
 * @param p
 */
export declare function center(shape: Shape, p: Vec2): Circle | Line | Polygon | Polyline | Rectangle;
