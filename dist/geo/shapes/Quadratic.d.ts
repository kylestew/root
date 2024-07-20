import { Attribs, Vec2 } from '../types';
export declare class Quadratic {
    pts: [Vec2, Vec2, Vec2];
    attribs: Attribs;
    /**
     * Represents a quadratic curve.
     *
     * @constructor
     * @param {Vec2} a - The starting point of the curve (or all points of the curve).
     * @param {Vec2} b - The control point of the curve.
     * @param {Vec2} c - The ending point of the curve
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(a: Vec2, b: Vec2, c: Vec2, attribs?: Attribs);
}
