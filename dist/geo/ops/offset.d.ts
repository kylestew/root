import { Shape } from '../types';
import { Circle, Rectangle } from '../index';
/**
 * Computes an offset shape (as in "path offsetting") of given shape and offset
 * distance `dist`.
 *
 * @param shape
 * @param dist
 */
export declare function offset(shape: Shape, dist: number): Circle | Rectangle;
