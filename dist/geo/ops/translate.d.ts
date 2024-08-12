import { Shape, Vec } from '../types';
import { Circle, Line, Polygon, Polyline, Rectangle, Cube } from '../index';
/**
 * Translates given shape by given `offset` vector.
 *
 * @param shape
 * @param offset - [x, y] | [x, y, z] offset vector
 */
export declare function translate(shape: Shape, offset: Vec): Circle | Line | Polygon | Polyline | Rectangle | Cube;
