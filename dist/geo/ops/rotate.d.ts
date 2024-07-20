import { Shape } from '../types';
import { Circle, Line, Polygon } from '../index';
/**
 * Rotates given 2D shape by `theta` (in radians).
 *
 * @param shape: Shape
 * @param theta: number
 */
export declare function rotate(shape: Shape, theta: number): Circle | Line | number[] | Polygon;
