import { Shape, Vec2 } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index'

import { resample } from './resample'

/**
 * Extracts/samples vertices from given shape's boundary and returns them as array.
 *
 * @example
 * ```ts
 * import { circle, vertices } from "@thi.ng/geom";
 *
 * // using default
 * asPoints(circle(100))
 *
 * // specify resolution only
 * asPoints(circle(100), 6)
 *
 * // specify more advanced options
 * asPoints(circle(100), { dist: 10 })
 * ```
 *
 * @param geo
 * @param num - number of vertices to sample (if not specified, uses default resolution per shape)
 */
export function asPoints(geo: Shape, num?: number): Vec2[] {
    if (geo instanceof Circle || geo instanceof Arc) {
        return resample(geo, num || 12).pts
    } else if (geo instanceof Ellipse) {
    } else if (geo instanceof Line || geo instanceof Polyline || geo instanceof Polygon || geo instanceof Rectangle) {
        if (num === undefined) {
            // just return the underlying points
            return geo.pts as Vec2[]
        } else {
            return resample(geo, num).pts
        }
    }
    throw new Error(`Method not implemented on ${geo.constructor.name}`)
}
