import { Shape } from '../geo/types';
/**
 * Creates a fuzzy effect by randomly distributing points along a shape.
 *
 * @param shape - The base shape to distribute points along (Circle, Line, Quadratic, or Rectangle)
 * @param pointCount - Number of points to generate
 * @param fuzziness - Amount of random offset to apply to the shape (higher = more fuzzy)
 * @param distributionFn - Function that returns a number between 0-1 to distribute points. Defaults to uniform random.
 * @returns Array of Vec2 points distributed along the shape
 *
 * @example
 * ```ts
 * // Create 1000 points along a circle with slight fuzziness
 * const circle = new Circle([0,0], 1)
 * const points = fuzz(circle, 1000, 0.1)
 * ```
 */
export declare function fuzz(shape: Shape, grainCount: number, fuzziness: number, distributionFn?: () => number): any[];
