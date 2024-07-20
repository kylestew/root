export class Polygon {
    /**
     * Construct a Polygon object
     *
     * @constructor
     * @param {Vec2[]} pts - The points of the Polygon object.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pts, attribs = {}) {
        this.pts = pts;
        this.attribs = attribs;
    }
}
