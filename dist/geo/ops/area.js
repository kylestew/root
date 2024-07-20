import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
/**
 * Computes the surface area of given `shape`.
 * For curves, lines, point clouds and rays the function returns 0.
 *
 * @param shape - shape to operate on
 *
 * @returns {number} A new Line object.
 */
export function area(shape) {
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
        return Math.PI * shape.r * shape.r;
    }
    else if (shape instanceof Ellipse) {
        return Math.PI * shape.r[0] * shape.r[1];
    }
    else if (shape instanceof Line) {
        return 0;
    }
    else if (shape instanceof Polygon) {
        let area = 0;
        const n = shape.pts.length;
        for (let i = 0; i < n; i++) {
            const [x1, y1] = shape.pts[i];
            const [x2, y2] = shape.pts[(i + 1) % n]; // Ensure the last point connects to the first
            area += x1 * y2 - y1 * x2;
        }
        return Math.abs(area) / 2;
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Rectangle) {
        return shape.size[0] * shape.size[1];
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
