import { Vec2, Attribs } from '../types';
export declare class Circle {
    pos: Vec2;
    r: number;
    attribs: Attribs;
    /**
     * Creates a Circle object
     *
     * @constructor
     * @param {Vec2} pos - The center of the circle.
     * @param {number} r - The radius of the object.
     */
    constructor(pos: Vec2, r: number, attribs?: Attribs);
}
