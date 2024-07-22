import { Circle, Line } from '../geo/index';
export declare class CircleLinePacking {
    obstacles: (Circle | Line)[];
    packed: (Circle | Line)[];
    constructor(obstacles?: (Circle | Line)[]);
    attemptPlacement(shape: Circle | Line, stepSize: number, maxSize: number): Circle | Line | undefined;
}
