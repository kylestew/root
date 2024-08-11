export class Arc {
    pos;
    r;
    start;
    end;
    clockwise;
    attribs;
    /**
     * Creates an Arc object
     *
     * @constructor
     * @param {Vec2} pos - The position of the object.
     * @param {number} r - The radius of the object.
     * @param {number} start - The starting angle of the object.
     * @param {number} end - The ending angle of the object.
     * @param {boolean} [clockwise=false] - Indicates whether the object is drawn in a clockwise direction.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pos, r, start, end, clockwise = false, attribs = {}) {
        this.pos = pos;
        this.r = r;
        this.start = start;
        this.end = end;
        this.clockwise = clockwise;
        this.attribs = attribs;
    }
    /**
     * Calculates the length of the arc
     *
     * @returns {number} The length of the arc
     */
    arcLength() {
        let deltaAngle = this.end - this.start;
        // Normalize deltaAngle to be within the range [0, 2 * Math.PI]
        if (deltaAngle < 0) {
            deltaAngle += 2 * Math.PI;
        }
        // If the arc is drawn in a clockwise direction, adjust the deltaAngle
        if (this.clockwise) {
            deltaAngle = 2 * Math.PI - deltaAngle;
        }
        // Calculate the arc length
        return this.r * deltaAngle;
    }
}
//# sourceMappingURL=Arc.js.map