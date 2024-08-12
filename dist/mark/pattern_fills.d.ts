import { Shape, Shape2D } from '../geo/types';
import { Line, Circle, Rectangle } from '../geo/index';
export declare function lines(shape: Shape2D, count: number, theta?: number, color?: string): Line[];
export declare function checkers(shape: Shape, rows?: number, columns?: number, color?: string): Rectangle[];
export declare function dotGrid(shape: Shape, sideCount?: number, radMult?: number, color?: string): Circle[];
