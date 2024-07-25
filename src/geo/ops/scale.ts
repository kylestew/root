import { Shape, Vec2 } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index'

import { centroid } from '../index'

/**
 * Scales given shape uniformly or non-uniformly by given `factor`.
 *
 * @remarks
 * Scaling non-uniformly might result in different result types, e.g.
 * {@link Circle} => {@link Ellipse}.
 *
 * @param shape
 * @param factor - single number or [sx, sy] vector
 */
export function scale(shape: Shape, factor: number) {
    if (Array.isArray(factor)) {
        if (factor.length !== 2) {
            throw new Error('Factor must be a single number or a 2D vector [sx, sy]')
        }
    } else if (typeof factor !== 'number') {
        throw new Error('Factor must be a single number or a 2D vector [sx, sy]')
    }

    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        let sx, sy
        if (Array.isArray(factor)) {
            ;[sx, sy] = factor
        } else {
            sx = sy = factor
        }

        if (sx === sy) {
            // Uniform scaling
            const newRadius = shape.r * sx
            return new Circle(shape.pos, newRadius, shape.attribs)
        } else {
            // Non-uniform scaling
            const newRadii: Vec2 = [shape.r * sx, shape.r * sy]
            return new Ellipse(shape.pos, newRadii, shape.attribs)
        }
    } else if (shape instanceof Ellipse) {
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
        let sx, sy
        if (Array.isArray(factor)) {
            ;[sx, sy] = factor
        } else {
            sx = sy = factor
        }

        const cent = centroid(shape)
        const scaledPoints: Vec2[] = shape.pts.map(([x, y]) => [
            cent[0] + (x - cent[0]) * sx,
            cent[1] + (y - cent[1]) * sy,
        ])
        return new Polygon(scaledPoints, shape.attribs)
    } else if (shape instanceof Polyline) {
        let sx, sy
        if (Array.isArray(factor)) {
            ;[sx, sy] = factor
        } else {
            sx = sy = factor
        }

        const scaledPoints: Vec2[] = shape.pts.map(([x, y]) => [x * sx, y * sy])
        return new Polyline(scaledPoints, shape.attribs)
    } else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
