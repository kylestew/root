import { Vec2, Attribs } from '../types'

export class Circle {
    pos: Vec2
    r: number
    attribs: Attribs

    /**
     * Creates a Circle object
     *
     * @constructor
     * @param {Vec2} pos - The position of the object.
     * @param {number} r - The radius of the object.
     */
    constructor(pos: Vec2, r: number, attribs: Attribs = {}) {
        this.pos = pos
        this.r = r
        this.attribs = attribs
    }
}
