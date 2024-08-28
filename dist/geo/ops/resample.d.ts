import { Shape } from '../types';
import { Polyline } from '../index';
/**
 * Resamples given 2D shape with given options and returns result as polygon (if
 * closed) or polyline (if open).
 *
 * @param shape - shape to resample
 * @param num - count of points to sample
 */
export declare function resample(shape: Shape, num: number): Polyline;
