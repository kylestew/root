import { centroid } from '../ops/centroid';
export class Sphere {
    pos; // center of the sphere - defaults to origin at center
    r;
    subdivisions;
    attribs;
    /**
     * Sphere shape constructor.
     *
     * @constructor
     * @param {Vec3} center - The position of the Sphere (origin at center).
     * @param {number} radius - The radius of the Sphere.
     * @param {number} subdivisions - The complexity of the Sphere.
     * @param {Attribs} [attribs={}] - Optional attributes for the sphere.
     */
    constructor(center, r, subdivisions = 2, attribs = {}) {
        if (center.length !== 3) {
            throw new Error('Position array must have exactly three elements.');
        }
        if (r <= 0) {
            throw new Error('Radius must be a positive number.');
        }
        this.pos = center;
        this.r = r;
        this.subdivisions = subdivisions;
        this.attribs = attribs;
    }
    /**
     * Creates a new `Sphere` object from a specified Circle. The Z position is set to 0.
     *
     * @param {Circle} circle - The circle object used to create the sphere.
     *
     * @returns {Sphere} The created sphere object.
     */
    static withCircle(circle) {
        const center = centroid(circle);
        const radius = circle.r;
        // Create and return a new Sphere object using the circle's radius and calculated center
        return new Sphere([center[0], center[1], 0], radius);
    }
    static insideCube(cube, subdivisions = 2) {
        const center = centroid(cube);
        const radius = Math.min(Math.min(cube.size[0], cube.size[1]), cube.size[2]) / 2;
        return new Sphere(center, radius, subdivisions);
    }
    get center() {
        return this.pos;
    }
}
//# sourceMappingURL=Sphere.js.map