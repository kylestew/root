export class Quadratic {
    /**
     * Represents a quadratic curve.
     *
     * @constructor
     * @param {Vec2} a - The starting point of the curve (or all points of the curve).
     * @param {Vec2} b - The control point of the curve.
     * @param {Vec2} c - The ending point of the curve
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(a, b, c, attribs = {}) {
        this.pts = [a, b, c];
        this.attribs = attribs;
    }
}
