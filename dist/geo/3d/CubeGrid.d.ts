import { Vec3 } from '../types.js';
import { Cube } from './Cube.js';
export interface GridCell3D {
    index: number;
    t: number;
    pos: Vec3;
    size: Vec3;
    row: number;
    col: number;
    layer: number;
    center: Vec3;
    cube: Cube;
}
export declare class CubeGrid {
    center: Vec3;
    size: Vec3;
    rows: number;
    cols: number;
    layers: number;
    constructor(center: Vec3, size: Vec3, rows: number, cols: number, layers: number);
    get cellCount(): number;
    get cellSize(): number[];
    cubes(): Cube[];
    private generateCell;
}
