import { Shape } from '../types';
import { Polygon } from '../index';
/**
 * Converts given shape into an array of {@link Polygon}s, using provided `num` parameter
 * to determine the number of vertices for each polygon.
 *
 * @param shape
 * @param num
 */
export declare function asPolygon(shape: Shape, num?: number): Polygon;
