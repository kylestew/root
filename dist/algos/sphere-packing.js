import { Sphere, intersects } from '../geo/index';
export class SpherePacking {
    obstacles;
    packed;
    constructor(obstacles = []) {
        this.obstacles = obstacles;
        this.packed = [];
    }
    /**
     * Attempts to place a Sphere within the packing area.
     * The sphere packer will not increase the size of the shape if `stepSize` is undefined.
     *
     * @param shape - The Sphere to be placed.
     * @param stepSize - The size of the step to be taken when extending the shape.
     * @param maxSize - The maximum size allowed for the shape.
     *
     * @returns The placed Sphere if successful, otherwise undefined.
     */
    attemptPlacement(shape, stepSize, maxSize) {
        maxSize = maxSize ?? 0;
        let targetShape = shape;
        let placedShape = undefined;
        while ([...this.obstacles, ...this.packed].every((otherShape) => !intersects(targetShape, otherShape))) {
            placedShape = targetShape;
            if (stepSize === undefined) {
                // if stepSize is undefined, we don't want to increase the size of the shape
                break;
            }
            if (targetShape.r >= maxSize) {
                break;
            }
            targetShape = new Sphere(targetShape.pos, targetShape.r + stepSize, targetShape.subdivisions, targetShape.attribs);
        }
        if (placedShape !== undefined) {
            this.packed.push(placedShape);
            return placedShape;
        }
        return undefined;
    }
}
//# sourceMappingURL=sphere-packing.js.map