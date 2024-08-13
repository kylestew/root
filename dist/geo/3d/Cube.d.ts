import { Vec3, Attribs } from '../types';
import { Rectangle } from '../2d/Rectangle';
export declare class Cube {
    pos: Vec3;
    size: Vec3;
    attribs: Attribs;
    /**
     * Cube shape constructor.
     *
     * @constructor
     * @param {Vec3} center - The position of the Cube (origin at center).
     * @param {Vec3} size - The size of the Cube.
     * @param {Attribs} [attribs={}] - Optional attributes for the cube.
     */
    constructor(center: number[], size: number[], attribs?: Attribs);
    get center(): Vec3;
    /**
     * Creates a new `Cube` object from a specified Rectangle. The 3rd dimension is set to the average of the first 2. Z position is set to 0.
     *
     * @param {Rectangle} rect - The rectangle object used to create the cube.
     *
     * @returns {Cube} The created cube object.
     */
    static withRect(rect: Rectangle): Cube;
}
