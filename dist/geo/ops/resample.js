import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
import { pointAt } from './pointAt';
/**
 * Resamples given 2D shape with given options and returns result as polygon (if
 * closed) or polyline (if open).
 *
 * @param shape
 * @param num
 */
export function resample(shape, num) {
    if (shape instanceof Arc) {
        const { pos, r, start, end } = shape;
        const [cx, cy] = pos;
        const delta = (end - start) / (num - 1);
        let pts = [];
        for (let i = 0; i < num; i++) {
            const angle = start + i * delta;
            pts.push([r * Math.cos(angle) + cx, r * Math.sin(angle) + cy]);
        }
        return new Polyline(pts, shape.attribs);
    }
    else if (shape instanceof Circle) {
        const pos = shape.pos;
        const r = shape.r;
        const delta = (Math.PI * 2.0) / num;
        let pts = [];
        for (let i = 0; i < num; i++) {
            pts.push([r * Math.cos(i * delta) + pos[0], r * Math.sin(i * delta) + pos[1]]);
        }
        return new Polyline(pts, shape.attribs);
    }
    else if (shape instanceof Ellipse) {
    }
    else if (shape instanceof Line) {
        let pts = [];
        for (let i = 0; i < num; i++) {
            const t = i / (num - 1);
            pts.push(pointAt(shape, t));
        }
        return new Polyline(pts, shape.attribs);
    }
    else if (shape instanceof Polygon) {
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
