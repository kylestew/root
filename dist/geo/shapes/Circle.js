export class Circle {
    pos;
    r;
    attribs;
    /**
     * Creates a Circle object
     *
     * @constructor
     * @param {Vec2} pos - The position of the object.
     * @param {number} r - The radius of the object.
     */
    constructor(pos, r, attribs = {}) {
        this.pos = pos;
        this.r = r;
        this.attribs = attribs;
    }
}
//# sourceMappingURL=Circle.js.map