import { Circle, Line, Quadratic, Rectangle, pointAt } from '../geo/index';
import { full } from '../array/index';
import { random, randomOffset } from '../random/index';
import { add } from '../math/vectors';
export function sand(shape, grainCount, fuzziness, distributionFn = () => random()) {
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
