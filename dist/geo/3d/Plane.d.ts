import { Vec3, Attribs } from '../types';
export declare class Plane {
    pos: Vec3;
    size: number;
    attribs: Attribs;
    /**
     * Plane shape constructor.
     *
     * @constructor
     * @param {Vec3} pos - The position of the Plane.
     * @param {number} size - The size of the Plane.
     * @param {Attribs} [attribs={}] - Optional attributes for the plane.
     */
    constructor(pos: Vec3, size: number, attribs?: Attribs);
}
