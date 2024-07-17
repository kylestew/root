import { Vec2, Attribs } from '../types'

export class Line {
    pts: [Vec2, Vec2]
    attribs: Attribs

    /**
     * Represents a line segment in a geometric space.
     *
     * @constructor
     * @param {Vec2 | [Vec2, Vec2]} pt1 - The starting point of the line segment or an array containing both points.
     * @param {Vec2 | Attribs} [pt2] - The ending point of the line segment or attributes.
     * @param {Attribs} [attribs={}] - Optional attributes for the line.
     */
    constructor(pt1: Vec2 | [Vec2, Vec2], pt2?: Vec2 | Attribs, attribs: Attribs = {}) {
        if (Array.isArray(pt1) && pt1.length === 2 && Array.isArray(pt1[0]) && Array.isArray(pt1[1])) {
            this.pts = pt1 as [Vec2, Vec2]
            this.attribs = (pt2 || {}) as Attribs
        } else {
            this.pts = [pt1 as Vec2, pt2 as Vec2]
            this.attribs = attribs
        }

        // Validate points
        this.pts.forEach((pt) => {
            if (!Array.isArray(pt) || pt.length !== 2 || !pt.every(Number.isFinite)) {
                throw new Error('Points must be arrays of two finite numbers')
            }
        })
    }

    /**
     * Creates a new Line object with the specified center, angle, size, and attributes.
     * @param {Vec2} center - The coordinates of the midpoint of the line.
     * @param {number} angle - The angle of rotation for the line (radians).
     * @param {number} length - The length of the line.
     * @param {Record<string, any>} [attribs={}] - Additional attributes
     * @returns {Line} A new Line object.
     */
    static withCenter(center: Vec2, angle: number, length: number, attribs: Record<string, any> = {}): Line {
        if (!Array.isArray(center) || center.length !== 2 || !center.every(Number.isFinite)) {
            throw new Error('Center must be an array of two finite numbers')
        }
        if (typeof angle !== 'number' || typeof length !== 'number') {
            throw new Error('Angle and length must be numbers')
        }

        const [cx, cy] = center
        const halfLength = length / 2

        // Calculate the start and end points of the line
        const startX = cx - halfLength * Math.cos(angle)
        const startY = cy - halfLength * Math.sin(angle)
        const endX = cx + halfLength * Math.cos(angle)
        const endY = cy + halfLength * Math.sin(angle)

        const start: Vec2 = [startX, startY]
        const end: Vec2 = [endX, endY]

        return new Line(start, end, attribs)
    }

    get length(): number {
        const [startX, startY] = this.pts[0]
        const [endX, endY] = this.pts[1]
        const dx = endX - startX
        const dy = endY - startY
        return Math.sqrt(dx * dx + dy * dy)
    }

    get centerPt(): Vec2 {
        const [startX, startY] = this.pts[0]
        const [endX, endY] = this.pts[1]
        return [(startX + endX) / 2, (startY + endY) / 2]
    }

    get angle(): number {
        const [startX, startY] = this.pts[0]
        const [endX, endY] = this.pts[1]
        return Math.atan2(endY - startY, endX - startX)
    }
}
