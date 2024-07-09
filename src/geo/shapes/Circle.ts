export interface Attribs {
    // TODO: fill these out
    [key: string]: any

    fill?: string
}

export class Circle {
    pos: [number, number]
    r: number
    attribs: Attribs

    /**
     * Creates a Circle object
     *
     * @constructor
     * @param {} pos - The position of the object.
     * @param {number} r - The radius of the object.
     */
    constructor(pos: [number, number], r: number, attribs: Attribs = {}) {
        this.pos = pos
        this.r = r
        this.attribs = attribs
    }
}
