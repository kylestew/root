import { Shape } from '../types';
/**
 * Converts a geometric object to a Path2D object.
 *
 * @param shape - The geometric shape to convert
 *
 * @returns {Path2D} - The converted Path2D object.
 * @throws {Error} - If the conversion method is not implemented for the given geometric object.
 */
export declare function asPath(shape: Shape): Path2D;
