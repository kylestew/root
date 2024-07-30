import { Rectangle } from '../index';
import { centroid } from './centroid';
/**
 * Computes an offset shape (as in "path offsetting") of given shape and offset
 * distance `dist`.
 *
 * @param shape: Shape - the shape to offset
 * @param dist: number | [number, number] - specifies offset for all four sides or top/bottom, left/right
 */
export function offset(shape, dist) {
    // if [number, number] need to implement as an Ellipse
    // if (shape instanceof Circle) {
    // return new Circle(shape.pos, shape.r + dist, shape.attribs)
    if (shape instanceof Rectangle) {
        return Rectangle.withCenterAndOffset(centroid(shape), shape.size, dist, shape.attribs);
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=offset.js.map