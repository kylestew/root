import { Shape } from '../types';
import { Rectangle } from '../index';
/**
 * Computes an offset shape (as in "path offsetting") of given shape and offset
 * distance `dist`.
 *
 * @param shape: Shape - the shape to offset
 * @param dist: number | [number, number] - specifies offset for all four sides or top/bottom, left/right
 */
export declare function offset(shape: Shape, dist: number | [number, number]): Rectangle;
