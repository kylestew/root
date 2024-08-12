import { Vec2 } from '../types';
import { Rectangle } from './Rectangle.js';
export interface GridCell {
    index: number;
    t: number;
    center: Vec2;
    size: Vec2;
    row: number;
    col: number;
    rect: Rectangle;
}
export declare class Grid {
    pos: Vec2;
    size: Vec2;
    rows: number;
    cols: number;
    constructor(center: Vec2, size: Vec2, rows: number, cols: number);
    static withRect(rect: Rectangle, rows: number, cols: number): Grid;
    get cellCount(): number;
    get cellSize(): number[];
    centers(): Vec2[];
    rects(): Rectangle[];
    cells(): GridCell[];
}
