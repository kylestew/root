import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
import { asPoints } from './asPoints';
import { partition, wrapSides } from '../../array/index';
/**
 * Extracts the edges of given shape's boundary and returns them as an iterable
 * of vector pairs.
 *
 * @param shape
 */
export function edges(shape) {
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
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
        return partition(wrapSides(asPoints(shape), 0, 1), 2, 1);
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=edges.js.map