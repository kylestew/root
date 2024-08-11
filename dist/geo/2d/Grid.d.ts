import { Vec2 } from '../types';
import { Rectangle } from './Rectangle.js';
export interface GridCell {
    index: number;
    t: number;
    pos: Vec2;
    size: Vec2;
    row: number;
    col: number;
    center: Vec2;
    rect: Rectangle;
}
export declare class Grid {
    pos: Vec2;
    size: Vec2;
    rows: number;
    cols: number;
    constructor(pos: Vec2, size: Vec2, rows: number, cols: number);
    static withRect(rect: Rectangle, rows: number, cols: number): Grid;
    get cellCount(): number;
    get cellSize(): number[];
    rects(): Rectangle[];
    centers(): Vec2[];
    cells(): GridCell[];
    private generateCell;
}
