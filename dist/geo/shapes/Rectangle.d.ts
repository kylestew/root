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
    get pts(): number[][];
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
     * Creates a rectangle with a specified center, size, inset, and attributes.
     *
     * @param {Vec2} center - The center coordinates of the rectangle.
     * @param {Vec2} size - The size of the rectangle (width and height).
     * @param {number} inset - The inset value for the rectangle (how much to shrink)
     * @param {Attribs} attribs - Additional attributes for the rectangle (optional).
     *
     * @returns {Shape} The created rectangle object.
     */
    static withCenterAndInset(center: Vec2, size: Vec2, inset: number, attribs?: Attribs): Rectangle;
    /**
     * Returns the maximum coordinates of the shape.
     * @returns {Vec2} An array containing the maximum coordinates [x, y].
     */
    get max(): Vec2;
}
