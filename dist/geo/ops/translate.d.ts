import { Shape, Vec, Vec2 } from '../types';
/**
 * Translates given shape by given `offset` vector.
 *
 * @param shape
 * @param offset - [x, y] | [x, y, z] offset vector
 */
export declare function translate(shape: Shape | Vec2, offset: Vec): Shape | Vec2;
