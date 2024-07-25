import { Shape } from '../types';
import { Line } from '../index';
/**
 * Splits given shape in 2 parts at normalized parametric position `t`.
 *
 * @param shape
 * @param t
 */
export declare function splitAt(shape: Shape, t: number): Line[];
