import { Circle, Line } from '../geo/index';
export declare class CircleLinePacking {
    obstacles: (Circle | Line)[];
    packed: (Circle | Line)[];
    constructor(obstacles?: (Circle | Line)[]);
    /**
     * Attempts to place a shape (either a Circle or a Line) within the packing area.
     * The circle packer will not increase the size of the shape if `stepSize` is undefined.
     *
     * @param shape - The shape (Circle or Line) to be placed.
     * @param stepSize - The size of the step to be taken when extending the shape.
     * @param maxSize - The maximum size allowed for the shape.
     *
     * @returns The placed shape (Circle or Line) if successful, otherwise undefined.
     */
    attemptPlacement(shape: Circle | Line, stepSize?: number, maxSize?: number): Circle | Line | undefined;
}
