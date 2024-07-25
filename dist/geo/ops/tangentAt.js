import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle, Quadratic } from '../index';
import { normalize, sub } from '../../math/index';
import { Bezier } from 'bezier-js';
/**
 * Computes tangent on shape/boundary at normalized parametric position `t`.
 *
 * @param shape
 * @param t
 */
export function tangentAt(shape, t) {
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
        // circle: (_, t) => cossin(TAU * t + HALF_PI),
    }
    else if (shape instanceof Ellipse) {
    }
    else if (shape instanceof Line) {
        const [a, b] = shape.pts;
        return normalize(sub(b, a));
    }
    else if (shape instanceof Polygon) {
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Quadratic) {
        const [start, ctrl, end] = shape.pts;
        const bezier = new Bezier(start[0], start[1], ctrl[0], ctrl[1], end[0], end[1]);
        const deriv = bezier.derivative(t);
        return [deriv.x, deriv.y];
    }
    else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=tangentAt.js.map