import { Vec2 } from '../types'
import { Rectangle } from './Rectangle.js'
import { centroid } from '../ops/centroid'

export interface GridCell {
    index: number
    t: number
    center: Vec2
    size: Vec2
    row: number
    col: number
    rect: Rectangle
}

export class Grid {
    pos: Vec2
    size: Vec2
    rows: number
    cols: number

    constructor(center: Vec2, size: Vec2, rows: number, cols: number) {
        const halfWidth = size[0] / 2
        const halfHeight = size[1] / 2
        const pos: Vec2 = [center[0] - halfWidth, center[1] - halfHeight]

        this.pos = pos
        this.size = size
        this.rows = rows
        this.cols = cols
    }

    static withRect(rect: Rectangle, rows: number, cols: number) {
        return new Grid(centroid(rect), rect.size, rows, cols)
    }

    get cellCount() {
        return this.rows * this.cols
    }

    get cellSize() {
        return [this.size[0] / this.cols, this.size[1] / this.rows]
    }

    centers(): Vec2[] {
        return this.cells().map((cell) => cell.center)
    }

    rects(): Rectangle[] {
        return this.cells().map((cell) => cell.rect)
    }

    cells(): GridCell[] {
        let [cellWidth, cellHeight] = this.cellSize

        let cells: GridCell[] = []
        let index = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let cx = this.pos[0] + j * cellWidth + cellWidth / 2
                let cy = this.pos[1] + i * cellHeight + cellHeight / 2
                const rect = new Rectangle([cx, cy], [cellWidth, cellHeight])
                cells.push({
                    row: i,
                    col: j,
                    index: index++,
                    t: index / this.cellCount,
                    center: [cx, cy],
                    size: [cellWidth, cellHeight],
                    rect,
                })
            }
        }
        return cells
    }
}
