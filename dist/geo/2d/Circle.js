export class Circle {
    pos;
    r;
    attribs;
    /**
     * Creates a Circle object
     *
     * @constructor
     * @param {Vec2} pos - The center of the circle.
     * @param {number} r - The radius of the object.
     */
    constructor(pos, r, attribs = {}) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }
}
//# sourceMappingURL=Circle.js.map