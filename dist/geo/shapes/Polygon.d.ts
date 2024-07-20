import { Attribs, Vec2 } from '../types';
export declare class Polygon {
    pts: Vec2[];
    attribs: Attribs;
    /**
     * Construct a Polygon object
     *
     * @constructor
     * @param {Vec2[]} pts - The points of the Polygon object.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pts: Vec2[], attribs?: Attribs);
}
