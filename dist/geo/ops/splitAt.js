import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
import { asPoints, pointAt } from '../index';
/**
 * Splits given shape in 2 parts at normalized parametric position `t`.
 *
 * @param shape
 * @param t
 */
export function splitAt(shape, t) {
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
    }
    else if (shape instanceof Ellipse) {
    }
    else if (shape instanceof Line) {
        const [a, b] = asPoints(shape);
        const splitPt = pointAt(shape, t);
        return [new Line(a, splitPt, shape.attribs), new Line(splitPt, b, shape.attribs)];
    }
    else if (shape instanceof Polygon) {
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=splitAt.js.map