import { Shape, Vec2 } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index'

import { asPoints } from './asPoints'

/**
 * Converts given shape into an array of {@link Polygon}s, using provided `num` parameter
 * to determine the number of vertices for each polygon.
 *
 * @param shape
 * @param num
 */
export function asPolygon(shape: Shape, num: number = 12) {
    if (shape instanceof Line || shape instanceof Polyline) {
        throw new Error(`Cannot convert ${shape.constructor.name} to Polygon`)
    }

    let pts: Vec2[] = []
    if (shape instanceof Rectangle) {
        // for a rectangle I really just want to corner points
        pts = shape.pts
    } else {
        pts = asPoints(shape, num)
    }
    return new Polygon(pts, shape.attribs)
}
