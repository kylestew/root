import { Shape, Vec2 } from '../geo/types'

import { Circle, Line, Quadratic, Rectangle, pointAt } from '../geo/index'
import { full } from '../array/index'
import { random, randomOffset } from '../random/index'
import { add } from '../math/vectors'

export function sand(shape: Shape, grainCount: number, fuzziness: number, distributionFn = () => random()) {
    function fuzzyShape() {
        if (shape instanceof Circle) {
            return new Circle(add(shape.pos, randomOffset(fuzziness, fuzziness)) as Vec2, shape.r)
        } else if (shape instanceof Line) {
            return new Line([
                add(shape.pts[0], randomOffset(fuzziness, fuzziness)) as Vec2,
                add(shape.pts[1], randomOffset(fuzziness, fuzziness)) as Vec2,
            ])
        } else if (shape instanceof Quadratic) {
            // TODO: make fuzzy
            return shape
        } else if (shape instanceof Rectangle) {
            // TODO: pointAt doesn't exist on rectangle
        }
    }

    return full(grainCount, () => pointAt(fuzzyShape() as Shape, distributionFn()))
}
