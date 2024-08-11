import { Vec2, Attribs } from '../types';
export declare class Arc {
    pos: Vec2;
    r: number;
    start: number;
    end: number;
    clockwise: boolean;
    attribs: Attribs;
    /**
     * Creates an Arc object
     *
     * @constructor
     * @param {Vec2} pos - The position of the object.
     * @param {number} r - The radius of the object.
     * @param {number} start - The starting angle of the object.
     * @param {number} end - The ending angle of the object.
     * @param {boolean} [clockwise=false] - Indicates whether the object is drawn in a clockwise direction.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pos: Vec2, r: number, start: number, end: number, clockwise?: boolean, attribs?: Attribs);
    /**
     * Calculates the length of the arc
     *
     * @returns {number} The length of the arc
     */
    arcLength(): number;
}
