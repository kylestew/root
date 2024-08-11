export class Ellipse {
    pos;
    r;
    attribs;
    /**
     * Creates an Ellipse object
     *
     * @constructor
     * @param {Vec2} pos - The position of the ellipse.
     * @param {[r1, r2]} r - The radius of the ellipse.
     */
    constructor(pos, r, attribs = {}) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }
}
//# sourceMappingURL=Ellipse.js.map