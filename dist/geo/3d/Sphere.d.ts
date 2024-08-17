import { Vec3, Attribs } from '../types';
import { Circle } from '../2d/Circle';
import { Cube } from './Cube';
export declare class Sphere {
    pos: Vec3;
    r: number;
    subdivisions: number;
    attribs: Attribs;
    /**
     * Sphere shape constructor.
     *
     * @constructor
     * @param {Vec3} center - The position of the Sphere (origin at center).
     * @param {number} radius - The radius of the Sphere.
     * @param {number} subdivisions - The complexity of the Sphere.
     * @param {Attribs} [attribs={}] - Optional attributes for the sphere.
     */
    constructor(center: number[], r: number, subdivisions?: number, attribs?: Attribs);
    /**
     * Creates a new `Sphere` object from a specified Circle. The Z position is set to 0.
     *
     * @param {Circle} circle - The circle object used to create the sphere.
     *
     * @returns {Sphere} The created sphere object.
     */
    static withCircle(circle: Circle): Sphere;
    static insideCube(cube: Cube, subdivisions?: number): Sphere;
    get center(): Vec3;
}
