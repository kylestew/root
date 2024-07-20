"use strict";
// import { Circle, Line, Quadratic, Rectangle } from '../geo'
// import { pointAt } from '../geo'
// import { full } from '../array'
// import { random, randomOffset } from '../random'
// import { add } from '../math/vectors'
// export function sand(shape, grainCount, fuzziness, distributionFn = () => random()) {
//     function fuzzyShape() {
//         if (shape instanceof Circle) {
//             return new Circle(add(shape.pos, randomOffset(fuzziness)), shape.r)
//         } else if (shape instanceof Line) {
//             return new Line([add(shape.pts[0], randomOffset(fuzziness)), add(shape.pts[1], randomOffset(fuzziness))])
//         } else if (shape instanceof Quadratic) {
//             // TODO: make fuzzy
//             return shape
//         } else if (shape instanceof Rectangle) {
//             // TODO: pointAt doesn't exist on rectangle
//         }
//     }
//     return full(grainCount, () => pointAt(fuzzyShape(), distributionFn()))
// }
