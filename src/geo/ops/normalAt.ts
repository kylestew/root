import { Shape, Vec2 } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle, Quadratic } from '../index'

import { resample } from './resample'

/**
 * Calculates the normal vector at a given point on a shape.
 * @param {Shape} shape - The shape to calculate the normal vector for.
 * @param {number} t - The parameter value representing the point on the shape.
 * @returns {number[]} The normal vector at the given point on the shape.
 * @throws {Error} If the method is not implemented for the given shape.
 */
export function normalAt(shape: Shape, t: number) {
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
        // const [start, ctrl, end] = shape.pts
        // const bezier = new Bezier(start[0], start[1], ctrl[0], ctrl[1], end[0], end[1])
        // const norm = bezier.normal(t)
        // return [norm.x, norm.y]
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
