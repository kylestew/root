import { Rectangle } from './Rectangle.js';
import { centroid } from '../ops/centroid';
export class Grid {
    pos;
    size;
    rows;
    cols;
    constructor(center, size, rows, cols) {
        const halfWidth = size[0] / 2;
        const halfHeight = size[1] / 2;
        const pos = [center[0] - halfWidth, center[1] - halfHeight];
        this.pos = pos;
        this.size = size;
        this.rows = rows;
        this.cols = cols;
    }
    static withRect(rect, rows, cols) {
        return new Grid(centroid(rect), rect.size, rows, cols);
    }
    get cellCount() {
        return this.rows * this.cols;
    }
    get cellSize() {
        return [this.size[0] / this.cols, this.size[1] / this.rows];
    }
    centers() {
        return this.cells().map((cell) => cell.center);
    }
    rects() {
        return this.cells().map((cell) => cell.rect);
    }
    cells() {
        let [cellWidth, cellHeight] = this.cellSize;
        let cells = [];
        let index = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let cx = this.pos[0] + j * cellWidth + cellWidth / 2;
                let cy = this.pos[1] + i * cellHeight + cellHeight / 2;
                const rect = new Rectangle([cx, cy], [cellWidth, cellHeight]);
                cells.push({
                    row: i,
                    col: j,
                    index: index++,
                    t: index / this.cellCount,
                    center: [cx, cy],
                    size: [cellWidth, cellHeight],
                    rect,
                });
            }
        }
        return cells;
    }
}
//# sourceMappingURL=Grid.js.map