export class Cube {
    pos; // center of cube - defaults origin to center
    size;
    attribs;
    /**
     * Cube shape constructor.
     *
     * @constructor
     * @param {Vec3} pos - The position of the Cube.
     * @param {Vec3} size - The size of the Cube.
     * @param {Attribs} [attribs={}] - Optional attributes for the cube.
     */
    constructor(pos, size, attribs = {}) {
        if (pos.length !== 3) {
            throw new Error('Position array must have exactly three elements.');
        }
        if (size.length !== 3) {
            throw new Error('Size array must have exactly three elements.');
        }
        this.pos = pos;
        this.size = size;
        this.attribs = attribs;
    }
}
//# sourceMappingURL=Cube.js.map