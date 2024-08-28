import { Sphere } from '../geo/index';
export declare class SpherePacking {
    obstacles: Sphere[];
    packed: Sphere[];
    constructor(obstacles?: Sphere[]);
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
    attemptPlacement(shape: Sphere, stepSize?: number, maxSize?: number): Sphere | undefined;
}
