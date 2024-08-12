import { toVec3 } from '../types';
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle, Cube } from '../index';
import { asPoints } from './asPoints';
/**
 * Translates given shape by given `offset` vector.
 *
 * @param shape
 * @param offset - [x, y] | [x, y, z] offset vector
 */
export function translate(shape, offset) {
    if (!Array.isArray(offset) || (offset.length !== 2 && offset.length !== 3)) {
        throw new Error('Offset must be a 2D or 3D vector');
    }
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
        const newPos = [shape.pos[0] + offset[0], shape.pos[1] + offset[1]];
        return new Circle(newPos, shape.r, shape.attribs);
    }
    else if (shape instanceof Ellipse) {
        // const newPos = [shape.pos[0] + offset[0], shape.pos[1] + offset[1]]
        // return new Ellipse(newPos, shape.r, shape.rotation, shape.attribs)
    }
    else if (shape instanceof Line) {
        const newPts = asPoints(shape).map((pt) => [pt[0] + offset[0], pt[1] + offset[1]]);
        return new Line(newPts[0], newPts[1], shape.attribs);
    }
    else if (shape instanceof Polygon) {
        // move all points
        const newPts = asPoints(shape).map((pt) => [pt[0] + offset[0], pt[1] + offset[1]]);
        return new Polygon(newPts, shape.attribs);
    }
    else if (shape instanceof Polyline) {
        // move all points
        const newPts = asPoints(shape).map((pt) => [pt[0] + offset[0], pt[1] + offset[1]]);
        return new Polyline(newPts, shape.attribs);
    }
    else if (shape instanceof Rectangle) {
        return new Rectangle([shape.pos[0] + offset[0], shape.pos[1] + offset[1]], shape.size, shape.attribs);
    }
    else if (shape instanceof Cube) {
        const vecOffset = toVec3(offset);
        return new Cube([shape.pos[0] + vecOffset[0], shape.pos[1] + vecOffset[1], shape.pos[2] + vecOffset[2]], shape.size, shape.attribs);
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
//# sourceMappingURL=translate.js.map