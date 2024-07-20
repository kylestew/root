import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
import { asPoints } from './asPoints';
/**
 * Rotates given 2D shape by `theta` (in radians).
 *
 * @param shape: Shape
 * @param theta: number
 */
export function rotate(shape, theta) {
    if (Array.isArray(shape) && shape.length == 2) {
        const [x, y] = shape;
        return [x * Math.cos(theta) - y * Math.sin(theta), x * Math.sin(theta) + y * Math.cos(theta)];
    }
    else if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
        const pt = shape.pos;
        const newCenter = [
            pt[0] * Math.cos(theta) - pt[1] * Math.sin(theta),
            pt[0] * Math.sin(theta) + pt[1] * Math.cos(theta),
        ];
        return new Circle(newCenter, shape.r, shape.attribs);
    }
    else if (shape instanceof Ellipse) {
    }
    else if (shape instanceof Line) {
        // Rotating both endpoints of the line
        const [start, end] = shape.pts;
        const newStart = [
            start[0] * Math.cos(theta) - start[1] * Math.sin(theta),
            start[0] * Math.sin(theta) + start[1] * Math.cos(theta),
        ];
        const newEnd = [
            end[0] * Math.cos(theta) - end[1] * Math.sin(theta),
            end[0] * Math.sin(theta) + end[1] * Math.cos(theta),
        ];
        return new Line(newStart, newEnd, shape.attribs);
    }
    else if (shape instanceof Polygon) {
        // rotate all points and make new polygon
        const newPts = shape.pts.map((pt) => [
            pt[0] * Math.cos(theta) - pt[1] * Math.sin(theta),
            pt[0] * Math.sin(theta) + pt[1] * Math.cos(theta),
        ]);
        return new Polygon(newPts, shape.attribs);
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Rectangle) {
        // For a rectangle, rotate its corner points
        return rotate(new Polygon(asPoints(shape), shape.attribs), theta);
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
