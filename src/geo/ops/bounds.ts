import { Shape } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle, Quadratic } from '../index'

import { subN, mulN } from '../../math/vectors'

/**
 * Computes and returns bounding rect/box for the given shape.
 *
 * @param shape
 */
export function bounds(shape: Shape) {
    /* https://github.com/thi-ng/umbrella/blob/41bd769068da804eeace622ec7db50e4d48f1dc9/packages/geom/src/bounds.ts#L65 */
    if (shape instanceof Arc) {
    } else if (shape instanceof Circle) {
        return new Rectangle(subN(shape.pos, shape.r), mulN([2, 2], shape.r))
    } else if (shape instanceof Ellipse) {
        const [cx, cy] = shape.pos
        const [rx, ry] = shape.r

        const minX = cx - rx
        const minY = cy - ry
        const maxX = cx + rx
        const maxY = cy + ry

        return new Rectangle([minX, minY], [maxX - minX, maxY - minY])
    } else if (shape instanceof Line) {
    } else if (shape instanceof Polygon) {
        const pts = shape.pts

        let minX = pts[0][0]
        let minY = pts[0][1]
        let maxX = pts[0][0]
        let maxY = pts[0][1]

        for (let i = 1; i < pts.length; i++) {
            let x = pts[i][0]
            let y = pts[i][1]

            if (x < minX) minX = x
            if (y < minY) minY = y
            if (x > maxX) maxX = x
            if (y > maxY) maxY = y
        }

        return new Rectangle([minX, minY], [maxX - minX, maxY - minY])
    } else if (shape instanceof Polyline) {
    } else if (shape instanceof Quadratic) {
        // const [start, ctrl, end] = shape.pts
        // const bezier = new Bezier(start[0], start[1], ctrl[0], ctrl[1], end[0], end[1])
        // return new Rectangle([bezier.bbox().x.min, bezier.bbox().y.min], [bezier.bbox().x.size, bezier.bbox().y.size])
    } else if (shape instanceof Rectangle) {
        return new Rectangle(shape.pos, shape.size)
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
