import { Vec3, Attribs } from '../types'

export class Cube {
    pos: Vec3
    size: Vec3
    attribs: Attribs

    /**
     * Cube shape constructor.
     *
     * @constructor
     * @param {Vec3} pos - The position of the Cube.
     * @param {Vec3} size - The size of the Cube.
     * @param {Attribs} [attribs={}] - Optional attributes for the cube.
     */
    constructor(pos: number[], size: number[], attribs: Attribs = {}) {
        if (pos.length !== 3) {
            throw new Error('Position array must have exactly three elements.')
        }
        if (size.length !== 3) {
            throw new Error('Size array must have exactly three elements.')
        }

        this.pos = pos as Vec3
        this.size = size as Vec3
        this.attribs = attribs
    }

    /**
     * Creates a new `Cube` object from a center point and size.
     *
     * @param {Vec3} center - The center point of the cube.
     * @param {Vec3} size - The size of the cube as an array of width, height, and depth.
     *
     * @returns {Cube} The created cube object.
     */
    static withCenter(center: Vec3, size: Vec3, attribs: Attribs = {}) {
        const halfWidth = size[0] / 2
        const halfHeight = size[1] / 2
        const halfDepth = size[2] / 2
        const pos: Vec3 = [center[0] - halfWidth, center[1] - halfHeight, center[2] - halfDepth]
        return new Cube(pos, size, attribs)
    }

    /**
     * Returns the maximum coordinates of the cube.
     * @returns {Vec3} An array containing the maximum coordinates [x, y, z].
     */
    get max(): Vec3 {
        return [this.pos[0] + this.size[0], this.pos[1] + this.size[1], this.pos[2] + this.size[2]]
    }
}
