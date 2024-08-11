import { Vec2 } from '../types'
import { Rectangle } from './Rectangle.js'

export interface GridCell {
    index: number
    t: number
    pos: Vec2
    size: Vec2
    row: number
    col: number
    center: Vec2
    rect: Rectangle
}

export class Grid {
    pos: Vec2
    size: Vec2
    rows: number
    cols: number

    constructor(pos: Vec2, size: Vec2, rows: number, cols: number) {
        this.pos = pos
        this.size = size
        this.rows = rows
        this.cols = cols
    }

    static withRect(rect: Rectangle, rows: number, cols: number) {
        return new Grid(rect.pos, rect.size, rows, cols)
    }

    get cellCount() {
        return this.rows * this.cols
    }

    get cellSize() {
        return [this.size[0] / this.cols, this.size[1] / this.rows]
    }

    rects(): Rectangle[] {
        let [cellWidth, cellHeight] = this.cellSize

        let grid = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                grid.push(this.generateCell(i, j, cellWidth, cellHeight))
            }
        }
        return grid
    }

    centers(): Vec2[] {
        let [cellWidth, cellHeight] = this.cellSize

        let centers: Vec2[] = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = this.pos[0] + j * cellWidth + cellWidth / 2
                let y = this.pos[1] + i * cellHeight + cellHeight / 2
                centers.push([x, y])
            }
        }
        return centers
    }

    cells(): GridCell[] {
        let [cellWidth, cellHeight] = this.cellSize

        let cells: GridCell[] = []
        let index = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = this.pos[0] + j * cellWidth
                let y = this.pos[1] + i * cellHeight
                cells.push({
                    row: i,
                    col: j,
                    index: index++,
                    t: index / this.cellCount,
                    pos: [x, y],
                    size: [cellWidth, cellHeight],
                    center: [x + cellWidth / 2, y + cellHeight / 2],
                    rect: this.generateCell(i, j, cellWidth, cellHeight),
                })
            }
        }
        return cells
    }

    private generateCell(row: number, col: number, cellWidth: number, cellHeight: number): Rectangle {
        let x = this.pos[0] + col * cellWidth
        let y = this.pos[1] + row * cellHeight
        return new Rectangle([x, y], [cellWidth, cellHeight])
    }
}
