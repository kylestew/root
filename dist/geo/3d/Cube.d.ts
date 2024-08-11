import { Vec3, Attribs } from '../types';
export declare class Cube {
    pos: Vec3;
    size: Vec3;
    attribs: Attribs;
    /**
     * Cube shape constructor.
     *
     * @constructor
     * @param {Vec3} pos - The position of the Cube.
     * @param {Vec3} size - The size of the Cube.
     * @param {Attribs} [attribs={}] - Optional attributes for the cube.
     */
    constructor(pos: number[], size: number[], attribs?: Attribs);
    /**
     * Creates a new `Cube` object from a center point and size.
     *
     * @param {Vec3} center - The center point of the cube.
     * @param {Vec3} size - The size of the cube as an array of width, height, and depth.
     *
     * @returns {Cube} The created cube object.
     */
    static withCenter(center: Vec3, size: Vec3, attribs?: Attribs): Cube;
    /**
     * Returns the maximum coordinates of the cube.
     * @returns {Vec3} An array containing the maximum coordinates [x, y, z].
     */
    get max(): Vec3;
}
