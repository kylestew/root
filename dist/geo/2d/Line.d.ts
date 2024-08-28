import { Vec2, Attribs } from '../types';
export declare class Line {
    pts: [Vec2, Vec2];
    attribs: Attribs;
    /**
     * Represents a line segment in a geometric space.
     *
     * @constructor
     * @param {Vec2 | [Vec2, Vec2]} pt1 - The starting point of the line segment or an array containing both points.
     * @param {Vec2 | Attribs} [pt2] - The ending point of the line segment or attributes.
     * @param {Attribs} [attribs={}] - Optional attributes for the line.
     */
    constructor(pt1: Vec2 | [Vec2, Vec2], pt2?: Vec2 | Attribs, attribs?: Attribs);
    /**
     * Creates a new Line object with the specified center, angle, size, and attributes.
     * @param {Vec2} center - The coordinates of the midpoint of the line.
     * @param {number} angle - The angle of rotation for the line (radians).
     * @param {number} length - The length of the line.
     * @param {Record<string, any>} [attribs={}] - Additional attributes
     * @returns {Line} A new Line object.
     */
    static withCenter(center: Vec2, angle: number, length: number, attribs?: Record<string, any>): Line;
    get length(): number;
    get centerPt(): Vec2;
    get angle(): number;
    /**
     * Creates a new Line object that is perpendicular to the current line, passing through the specified point.
     * @param {Vec2} point - The point through which the perpendicular line will pass.
     * @returns {Line} A new Line object that is perpendicular to the current line.
     */
    perpendicular(point: Vec2): Line;
}
