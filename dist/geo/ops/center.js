import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle, Quadratic } from '../index';
import { centroid } from '../ops/centroid';
import { translate } from '../ops/translate';
import { sub } from '../../math/vectors';
/**
 * Returns copy of given shape centered around optionally provided point `p`
 * (default: shape centroid).
 *
 * @param shape
 * @param p
 */
export function center(shape, p) {
    if (p === undefined) {
        p = [0, 0];
    }
    if (shape instanceof Arc) {
    }
    else if (shape instanceof Circle) {
    }
    else if (shape instanceof Ellipse) {
    }
    else if (shape instanceof Line) {
    }
    else if (shape instanceof Polygon) {
        const c = centroid(shape);
        return translate(shape, sub(p, c));
    }
    else if (shape instanceof Polyline) {
    }
    else if (shape instanceof Quadratic) {
    }
    else if (shape instanceof Rectangle) {
    }
    throw new Error(`Method not implemented on ${shape.constructor.name}`);
}
