import { Vec2, Attribs } from '../types';
export declare class Rectangle {
    pos: Vec2;
    size: Vec2;
    attribs: Attribs;
    /**
     * Rectangle shape constructor.
     *
     * @constructor
     * @param {Vec2} pos - The position of the Rectangle.
     * @param {Vec2} size - The size of the Rectangle.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pos: number[], size: number[], attribs?: Attribs);
    get pts(): Vec2[];
    /**
     * Creates a new `Rect` object from a center point and size.
     *
     * @param {Vec2} center - The center point of the rectangle.
     * @param {Vec2} size - The size of the rectangle as an array of width and height.
     *
     * @returns {Shape} The created rectangle object.
     */
    static withCenter(center: Vec2, size: Vec2, attribs?: Attribs): Rectangle;
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
    static withCenterAndOffset(center: Vec2, size: Vec2, offset: number | [number, number], attribs?: Attribs): Rectangle;
    /**
     * Returns the maximum coordinates of the shape.
     * @returns {Vec2} An array containing the maximum coordinates [x, y].
     */
    get max(): Vec2;
    /**
     * Returns a new Rectangle representing the largest square
     * that fits inside this rectangle, centered within it.
     *
     * @returns {Rectangle} The centered square.
     */
    getCenteredSquare(): Rectangle;
}
