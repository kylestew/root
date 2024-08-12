import { Vec2, Attribs } from '../types';
export declare class Rectangle {
    pos: Vec2;
    size: Vec2;
    attribs: Attribs;
    /**
     * Rectangle shape constructor.
     *
     * @constructor
     * @param {Vec2} center - The position of the Rectangle (origin at center).
     * @param {Vec2} size - The size of the Rectangle.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(center: number[], size: number[], attribs?: Attribs);
    get pts(): Vec2[];
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
    static withOffset(pos: Vec2, size: Vec2, offset: number | [number, number], attribs?: Attribs): Rectangle;
    /**
     * Returns the maximum coordinates of the shape.
     * @returns {Vec2} An array containing the maximum coordinates [x, y].
     */
    get max(): Vec2;
}
