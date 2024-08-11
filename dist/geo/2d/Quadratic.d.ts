import { Attribs, Vec2 } from '../types';
export declare class Quadratic {
    pts: [Vec2, Vec2, Vec2];
    attribs: Attribs;
    /**
     * Represents a quadratic curve.
     *
     * @constructor
     * @param {Vec2 | Vec2[]} a - The starting point of the curve or an array containing all points.
     * @param {Vec2} [b] - The control point of the curve (if the first parameter is a Vec2).
     * @param {Vec2} [c] - The ending point of the curve (if the first parameter is a Vec2).
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(a: Vec2 | [Vec2, Vec2, Vec2], b?: Vec2, c?: Vec2, attribs?: Attribs);
}
