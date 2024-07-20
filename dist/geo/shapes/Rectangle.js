export class Rectangle {
    /**
     * Rectangle shape constructor.
     *
     * @constructor
     * @param {Vec2} pos - The position of the Rectangle.
     * @param {Vec2} size - The size of the Rectangle.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pos, size, attribs = {}) {
        if (pos.length !== 2) {
            throw new Error('Position array must have exactly two elements.');
        }
        if (size.length !== 2) {
            throw new Error('Size array must have exactly two elements.');
        }
        this.pos = pos;
        this.size = size;
        this.attribs = attribs;
    }
    get pts() {
        const [x0, y0] = this.pos;
        const [x1, y1] = this.max;
        return [
            [x0, y0],
            [x1, y0],
            [x1, y1],
            [x0, y1],
        ];
    }
    /**
     * Creates a new `Rect` object from a center point and size.
     *
     * @param {Vec2} center - The center point of the rectangle.
     * @param {Vec2} size - The size of the rectangle as an array of width and height.
     *
     * @returns {Shape} The created rectangle object.
     */
    static withCenter(center, size, attribs = {}) {
        const halfWidth = size[0] / 2;
        const halfHeight = size[1] / 2;
        const pos = [center[0] - halfWidth, center[1] - halfHeight];
        return new Rectangle(pos, size, attribs);
    }
    /**
     * Creates a rectangle with a specified center, size, inset, and attributes.
     *
     * @param {Vec2} center - The center coordinates of the rectangle.
     * @param {Vec2} size - The size of the rectangle (width and height).
     * @param {number} inset - The inset value for the rectangle (how much to shrink)
     * @param {Attribs} attribs - Additional attributes for the rectangle (optional).
     *
     * @returns {Shape} The created rectangle object.
     */
    static withCenterAndInset(center, size, inset, attribs = {}) {
        const newSize = [size[0] - 2 * inset, size[1] - 2 * inset];
        const halfWidth = newSize[0] / 2;
        const halfHeight = newSize[1] / 2;
        const pos = [center[0] - halfWidth, center[1] - halfHeight];
        return new Rectangle(pos, newSize, attribs);
    }
    /**
     * Returns the maximum coordinates of the shape.
     * @returns {Vec2} An array containing the maximum coordinates [x, y].
     */
    get max() {
        return [this.pos[0] + this.size[0], this.pos[1] + this.size[1]];
    }
}
