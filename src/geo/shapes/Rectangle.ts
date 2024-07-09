import { Vec2, Attribs } from '../types'

export class Rectangle {
    pos: Vec2
    size: Vec2
    attribs: Attribs

    /**
     * Rectangle shape constructor.
     *
     * @constructor
     * @param {Vec2} pos - The position of the Rectangle.
     * @param {Vec2} size - The size of the Rectangle.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pos: Vec2, size: Vec2, attribs: Attribs = {}) {
        this.pos = pos
        this.size = size
        this.attribs = attribs
    }

    get pts() {
        const [x0, y0] = this.pos
        const [x1, y1] = this.max
        return [
            [x0, y0],
            [x1, y0],
            [x1, y1],
            [x0, y1],
        ]
    }

    /**
     * Creates a new `Rect` object from a center point and size.
     *
     * @param {Vec2} center - The center point of the rectangle.
     * @param {Vec2} size - The size of the rectangle as an array of width and height.
     *
     * @returns {Shape} The created rectangle object.
     */
    static withCenter(center: Vec2, size: Vec2, attribs: Attribs = {}) {
        const halfWidth = size[0] / 2
        const halfHeight = size[1] / 2
        const pos: Vec2 = [center[0] - halfWidth, center[1] - halfHeight]
        return new Rectangle(pos, size, attribs)
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
    static withCenterAndInset(center: Vec2, size: Vec2, inset: number, attribs: Attribs = {}) {
        const newSize: Vec2 = [size[0] - 2 * inset, size[1] - 2 * inset]
        const halfWidth = newSize[0] / 2
        const halfHeight = newSize[1] / 2
        const pos: Vec2 = [center[0] - halfWidth, center[1] - halfHeight]
        return new Rectangle(pos, newSize, attribs)
    }

    /**
     * Returns the maximum coordinates of the shape.
     * @returns {Vec2} An array containing the maximum coordinates [x, y].
     */
    get max(): Vec2 {
        return [this.pos[0] + this.size[0], this.pos[1] + this.size[1]]
    }
}
