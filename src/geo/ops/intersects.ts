import { Shape } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index'

import { dist } from '../../math/vectors'
import { circleLineIntersection, lineLineIntersection } from '../math/index'

/**
 * Performs intersection tests on given 2 shapes and returns the intersection point(s) or a boolean for simple overlap checks.
 *
 * @param {Shape} a - The first shape.
 * @param {Shape} b - The second shape.
 * @returns {boolean|Array|null} - Returns a boolean for circle-circle intersection, an array with the intersection point for ray-line intersection, or null if no intersection.
 */
export function intersects(a: Shape, b: Shape) {
    if (a instanceof Circle && b instanceof Circle) {
        return dist(a.pos, b.pos) < a.r + b.r
    } else if (a instanceof Circle && b instanceof Line) {
        return circleLineIntersection(a, b)
    } else if (a instanceof Line && b instanceof Circle) {
        return circleLineIntersection(b, a)
    } else if (a instanceof Line && b instanceof Line) {
        return lineLineIntersection(a, b)
        // } else if (a instanceof Ray && b instanceof Line) {
        //     return rayLineIntersection(a, b)
    }
    throw new Error(`Method not implemented for shapes: ${a.constructor.name} and ${b.constructor.name}`)
}
