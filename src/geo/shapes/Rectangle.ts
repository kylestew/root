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
    constructor(pos: number[], size: number[], attribs: Attribs = {}) {
        if (pos.length !== 2) {
            throw new Error('Position array must have exactly two elements.')
        }
        if (size.length !== 2) {
            throw new Error('Size array must have exactly two elements.')
        }

        this.pos = pos as Vec2
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
     * Creates a rectangle with a specified center, size, offset, and attributes.
     *
     * @param {Vec2} center - The center coordinates of the rectangle.
     * @param {Vec2} size - The size of the rectangle (width and height).
     * @param {number | [number, number]} offset - The offset value for the rectangle.
     *        If a single number is provided, it applies uniformly to all sides.
     *        If an array is provided, the first value applies to the top/bottom, and the second to the left/right.
     * @param {Attribs} attribs - Additional attributes for the rectangle (optional).
     *
     * @returns {Rectangle} The created rectangle object.
     */
    static withCenterAndOffset(center: Vec2, size: Vec2, offset: number | [number, number], attribs: Attribs = {}) {
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

        // Calculate the position to keep the rectangle centered
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

    /**
     * Returns a new Rectangle representing the largest square
     * that fits inside this rectangle, centered within it.
     *
     * @returns {Rectangle} The centered square.
     */
    getCenteredSquare(): Rectangle {
        const sideLength = Math.min(this.size[0], this.size[1])
        const centerX = this.pos[0] + this.size[0] / 2
        const centerY = this.pos[1] + this.size[1] / 2
        const pos: Vec2 = [centerX - sideLength / 2, centerY - sideLength / 2]
        const size: Vec2 = [sideLength, sideLength]
        return new Rectangle(pos, size, this.attribs)
    }
}
