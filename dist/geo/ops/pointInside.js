import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
/**
 * Returns true if point `pt` is inside the given shape.
 *
 * @param shape
 * @param pt
 */
export function pointInside(shape, pt) {
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
        const [x, y] = pt;
        const [cx, cy] = shape.pos;
        const r = shape.r;
        return (x - cx) ** 2 + (y - cy) ** 2 <= r ** 2;
    }
    else if (shape instanceof Ellipse) {
        const [x, y] = pt;
        const [cx, cy] = shape.pos;
        const [rx, ry] = shape.r;
        // Check if the point lies within the ellipse using the standard ellipse equation
        return (x - cx) ** 2 / rx ** 2 + (y - cy) ** 2 / ry ** 2 <= 1;
    }
    else if (shape instanceof Line) {
    }
    else if (shape instanceof Polygon) {
        // raycasting algorithm
        const [x, y] = pt;
        const pts = shape.pts;
        var inside = false;
        for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            var xi = pts[i][0], yi = pts[i][1];
            var xj = pts[j][0], yj = pts[j][1];
            var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Rectangle) {
        const [x, y] = pt;
        const [x0, y0] = shape.pos;
        const [x1, y1] = shape.max;
        return x >= x0 && x <= x1 && y >= y0 && y <= y1;
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
