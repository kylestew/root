export class Polyline {
    pts;
    attribs;
    /**
     * Construct a Polyline object
     *
     * @constructor
     * @param {Array} pts - The points of the Polyline object.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pts, attribs = {}) {
        this.pts = pts;
        this.attribs = attribs;
    }
}
//# sourceMappingURL=Polyline.js.map