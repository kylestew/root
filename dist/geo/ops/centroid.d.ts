import { Shape2D, Shape3D, Vec2, Vec3 } from '../types';
/**
 * Computes centroid (center point) of given shape
 *
 * @param shape
 */
export declare function centroid<T extends Shape2D | Shape3D>(shape: T): T extends Shape3D ? Vec3 : Vec2;
