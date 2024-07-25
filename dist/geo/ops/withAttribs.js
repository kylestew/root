import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle } from '../index';
export function withAttribs(shape, attribs) {
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
        return new Circle(shape.pos, shape.r, attribs);
    }
    else if (shape instanceof Ellipse) {
    }
    else if (shape instanceof Line) {
        return new Line(shape.pts, attribs);
    }
    else if (shape instanceof Polygon) {
        return new Polygon(shape.pts, attribs);
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Rectangle) {
        return new Rectangle(shape.pos, shape.size, attribs);
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=withAttribs.js.map