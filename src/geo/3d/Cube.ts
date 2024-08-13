import { Vec3, Attribs } from '../types'
import { Rectangle } from '../2d/Rectangle'
import { centroid } from '../ops/centroid'

export class Cube {
    pos: Vec3 // center of cube - defaults origin to center
    size: Vec3
    attribs: Attribs

    /**
     * Cube shape constructor.
     *
     * @constructor
     * @param {Vec3} center - The position of the Cube (origin at center).
     * @param {Vec3} size - The size of the Cube.
     * @param {Attribs} [attribs={}] - Optional attributes for the cube.
     */
    constructor(center: number[], size: number[], attribs: Attribs = {}) {
        if (center.length !== 3) {
            throw new Error('Position array must have exactly three elements.')
        }
        if (size.length !== 3) {
            throw new Error('Size array must have exactly three elements.')
        }

        const halfWidth = size[0] / 2
        const halfHeight = size[1] / 2
        const halfDepth = size[2] / 2
        const pos: Vec3 = [center[0] - halfWidth, center[1] - halfHeight, center[2] - halfDepth]

        this.pos = pos
        this.size = size as Vec3
        this.attribs = attribs
    }

    get center(): Vec3 {
        const halfWidth = this.size[0] / 2
        const halfHeight = this.size[1] / 2
        const halfDepth = this.size[2] / 2
        const center: Vec3 = [this.pos[0] + halfWidth, this.pos[1] + halfHeight, this.pos[2] + halfDepth]
        return center
    }

    /**
     * Creates a new `Cube` object from a specified Rectangle. The 3rd dimension is set to the average of the first 2. Z position is set to 0.
     *
     * @param {Rectangle} rect - The rectangle object used to create the cube.
     *
     * @returns {Cube} The created cube object.
     */
    static withRect(rect: Rectangle) {
        // Calculate the third dimension as the average of the rectangle's width and height
        const depth = (rect.size[0] + rect.size[1]) / 2
        const center = centroid(rect)

        // Create and return a new Cube object using the rectangle's width, height, and calculated depth
        return new Cube([center[0], center[1], 0], [rect.size[0], rect.size[1], depth])
    }
}
