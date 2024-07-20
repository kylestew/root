import { Shape, Vec2 } from '../types';
import { Circle, Line, Polygon, Polyline, Rectangle } from '../index';
/**
 * Translates given shape by given `offset` vector.
 *
 * @param shape
 * @param offset - [x, y] offset vector
 */
export declare function translate(shape: Shape, offset: Vec2): Circle | Line | Polygon | Polyline | Rectangle;
