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
}
