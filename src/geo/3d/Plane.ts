import { Vec3, Attribs } from '../types'

export class Plane {
    pos: Vec3
    size: number
    attribs: Attribs

    /**
     * Plane shape constructor.
     *
     * @constructor
     * @param {Vec3} pos - The position of the Plane.
     * @param {number} size - The size of the Plane.
     * @param {Attribs} [attribs={}] - Optional attributes for the plane.
     */
    constructor(pos: Vec3, size: number, attribs: Attribs = {}) {
        if (pos.length !== 3) {
            throw new Error('Position array must have exactly three elements.')
        }

        this.pos = pos
        this.size = size
        this.attribs = attribs
    }
}
