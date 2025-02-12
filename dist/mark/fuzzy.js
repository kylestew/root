import { Circle, Line, Quadratic, Rectangle, pointAt } from '../geo/index';
import { full } from '../array/index';
import { random, randomOffset } from '../random/index';
import { add } from '../math/vectors';
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
export function fuzz(shape, grainCount, fuzziness, distributionFn = () => random()) {
    function fuzzyShape() {
        if (shape instanceof Circle) {
            return new Circle(add(shape.pos, randomOffset(fuzziness, fuzziness)), shape.r);
        }
        else if (shape instanceof Line) {
            return new Line([
                add(shape.pts[0], randomOffset(fuzziness, fuzziness)),
                add(shape.pts[1], randomOffset(fuzziness, fuzziness)),
            ]);
        }
        else if (shape instanceof Quadratic) {
            // TODO: make fuzzy
            return shape;
        }
        else if (shape instanceof Rectangle) {
            // TODO: pointAt doesn't exist on rectangle
        }
    }
    return full(grainCount, () => pointAt(fuzzyShape(), distributionFn()));
}
//# sourceMappingURL=fuzzy.js.map