import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
import { centroid } from './centroid';
/**
 * Computes an offset shape (as in "path offsetting") of given shape and offset
 * distance `dist`.
 *
 * @param shape
 * @param dist
 */
export function offset(shape, dist) {
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
        return new Circle(shape.pos, shape.r + dist, shape.attribs);
    }
    else if (shape instanceof Ellipse) {
    }
    else if (shape instanceof Line) {
    }
    else if (shape instanceof Polygon) {
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Rectangle) {
        return Rectangle.withCenterAndInset(centroid(shape), shape.size, -dist, shape.attribs);
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=offset.js.map