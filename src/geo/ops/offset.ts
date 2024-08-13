import { Shape, Vec2, Vec3, toVec2, toVec3 } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index'
import { Cube } from '../index'

import { centroid } from './centroid'

/**
 * Computes an offset shape (as in "path offsetting") of given shape and offset
 * distance `dist`.
 *
 * @param shape: Shape - the shape to offset
 * @param dist: number | [number, number] - specifies offset for all four sides or top/bottom, left/right
 */
export function offset(shape: Shape, dist: number | Vec2 | Vec3) {
    if (shape instanceof Circle) {
        // TODO: if dist is a Vec2, need to return an ellipse
        const offsetDist = typeof dist === 'number' ? dist : dist[0]
        return new Circle(shape.pos, shape.r + offsetDist, shape.attribs)
    } else if (shape instanceof Rectangle) {
        const offsetVec: Vec2 = toVec2(dist)
        return Rectangle.withOffset(centroid(shape), shape.size, offsetVec, shape.attribs)
    } else if (shape instanceof Cube) {
        const offsetVec: Vec3 = toVec3(dist)
        const newSize: Vec3 = [shape.size[0] + offsetVec[0], shape.size[1] + offsetVec[1], shape.size[2] + offsetVec[2]]
        return new Cube(centroid(shape), newSize, shape.attribs)
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`)
}
