import { Shape, Vec2 } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index'

/**
 * Finds the closest point on a shape to a given point.
 *
 * @param {Shape} shape - The shape to find the closest point on.
 * @param {Vec2} pt - The point to find the closest point to.
 * @returns {Vec2} The closest point on the shape to the given point.
 * @throws {Error} If the method is not implemented for the given shape.
 */
export function closestPoint(shape: Shape, pt: Vec2): Vec2 {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
        // Compute the closest point on the line
        const [lineStart, lineEnd] = shape.pts
        const A = pt[0] - lineStart[0]
        const B = pt[1] - lineStart[1]
        const C = lineEnd[0] - lineStart[0]
        const D = lineEnd[1] - lineStart[1]

        const dot = A * C + B * D
        const len_sq = C * C + D * D
        const param = len_sq !== 0 ? dot / len_sq : -1

        let closest: Vec2
        if (param < 0) {
            closest = lineStart
        } else if (param > 1) {
            closest = lineEnd
        } else {
            closest = [lineStart[0] + param * C, lineStart[1] + param * D]
        }

        return closest
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
