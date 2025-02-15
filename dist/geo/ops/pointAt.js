import { Circle, Line, Quadratic } from '../index';
import { Bezier } from 'bezier-js';
/**
 * Samples and returns point on the boundary of given 2D shape at normalized
 * parametric distance `t`. If the shape is closed, t=0 and t=1 yield the same
 * result.
 *
 * @param shape
 * @param t
 */
export function pointAt(shape, t) {
    if (shape instanceof Circle) {
        const theta = t * Math.PI * 2;
        const x = Math.cos(theta) * shape.r + shape.pos[0];
        const y = Math.sin(theta) * shape.r + shape.pos[1];
        return [x, y];
    }
    else if (shape instanceof Line) {
        const x = shape.pts[0][0] + t * (shape.pts[1][0] - shape.pts[0][0]);
        const y = shape.pts[0][1] + t * (shape.pts[1][1] - shape.pts[0][1]);
        return [x, y];
    }
    else if (shape instanceof Quadratic) {
        const [start, ctrl, end] = shape.pts;
        const bezier = new Bezier(start[0], start[1], ctrl[0], ctrl[1], end[0], end[1]);
        return [bezier.get(t).x, bezier.get(t).y];
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=pointAt.js.map