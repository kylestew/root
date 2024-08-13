import { Vec3 } from '../types.js';
import { Cube } from './Cube.js';
export interface GridCell3D {
    index: number;
    t: number;
    center: Vec3;
    size: Vec3;
    row: number;
    col: number;
    layer: number;
    cube: Cube;
}
export declare class CubeGrid {
    pos: Vec3;
    size: Vec3;
    rows: number;
    cols: number;
    layers: number;
    constructor(center: Vec3, size: Vec3, rows: number, cols: number, layers: number);
    static withCube(cube: Cube, rows: number, cols: number, layers: number): CubeGrid;
    get cellCount(): number;
    get cellSize(): number[];
    centers(): Vec3[];
    cubes(): Cube[];
    cells(): GridCell3D[];
}
