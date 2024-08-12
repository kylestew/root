import { Vec2, Attribs } from '../types'

export class Rectangle {
    pos: Vec2
    size: Vec2
    attribs: Attribs

    /**
     * Rectangle shape constructor.
     *
     * @constructor
     * @param {Vec2} center - The position of the Rectangle (origin at center).
     * @param {Vec2} size - The size of the Rectangle.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(center: number[], size: number[], attribs: Attribs = {}) {
        if (center.length !== 2) {
            throw new Error('Position array must have exactly two elements.')
        }
        if (size.length !== 2) {
            throw new Error('Size array must have exactly two elements.')
        }

        const halfWidth = size[0] / 2
        const halfHeight = size[1] / 2
        const pos: Vec2 = [center[0] - halfWidth, center[1] - halfHeight]

        this.pos = pos
        this.size = size as Vec2
        this.attribs = attribs
    }

    get pts(): Vec2[] {
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
     * Creates a rectangle with a specified center, size, offset, and attributes.
     *
     * @param {Vec2} pos - The position of the rectangle (origin is center).
     * @param {Vec2} size - The size of the rectangle (width and height).
     * @param {number | [number, number]} offset - The offset value for the rectangle.
     *        If a single number is provided, it applies uniformly to all sides.
     *        If an array is provided, the first value applies to the top/bottom, and the second to the left/right.
     * @param {Attribs} attribs - Additional attributes for the rectangle (optional).
     *
     * @returns {Rectangle} The created rectangle object.
     */
    static withOffset(pos: Vec2, size: Vec2, offset: number | [number, number], attribs: Attribs = {}) {
        let offsetTopBottom: number
        let offsetLeftRight: number

        if (typeof offset === 'number') {
            // If offset is a single number, use it for all sides
            offsetTopBottom = offsetLeftRight = offset
        } else {
            // If offset is an array, use the first value for top/bottom and the second for left/right
            ;[offsetTopBottom, offsetLeftRight] = offset
        }

        // Calculate the new size with the offsets applied
        const newSize: Vec2 = [size[0] + offsetLeftRight * 2, size[1] + offsetTopBottom * 2]

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
