import { Vec2, Attribs } from '../types';
export declare class Ellipse {
    pos: Vec2;
    r: Vec2;
    attribs: Attribs;
    /**
     * Creates an Ellipse object
     *
     * @constructor
     * @param {Vec2} pos - The position of the ellipse.
     * @param {[r1, r2]} r - The radius of the ellipse.
     */
    constructor(pos: Vec2, r: Vec2, attribs?: {});
}
