import { Attribs, Vec2 } from '../types'

export class Polyline {
    pts: Vec2[]
    attribs: Attribs

    /**
     * Construct a Polyline object
     *
     * @constructor
     * @param {Array} pts - The points of the Polyline object.
     * @param {Attribs} [attribs={}] - Optional attributes for the curve.
     */
    constructor(pts: Vec2[], attribs: Attribs = {}) {
        this.pts = pts
        this.attribs = attribs
    }
}
