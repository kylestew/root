export class Plane {
    pos;
    size;
    attribs;
    /**
     * Plane shape constructor.
     *
     * @constructor
     * @param {Vec3} pos - The position of the Plane.
     * @param {number} size - The size of the Plane.
     * @param {Attribs} [attribs={}] - Optional attributes for the plane.
     */
    constructor(pos, size, attribs = {}) {
        if (pos.length !== 3) {
            throw new Error('Position array must have exactly three elements.');
        }
        this.pos = pos;
        this.size = size;
        this.attribs = attribs;
    }
}
//# sourceMappingURL=Plane.js.map