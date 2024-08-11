import { Vec3 } from '../types.js'
import { Cube } from './Cube.js'

export interface GridCell3D {
    index: number
    t: number
    pos: Vec3
    size: Vec3
    row: number
    col: number
    layer: number
    center: Vec3
    cube: Cube
}

export class CubeGrid {
    center: Vec3
    size: Vec3
    rows: number
    cols: number
    layers: number

    constructor(center: Vec3, size: Vec3, rows: number, cols: number, layers: number) {
        this.center = center
        this.size = size
        this.rows = rows
        this.cols = cols
        this.layers = layers
    }

    // static withCube(cube: Cube, rows: number, cols: number, layers: number) {
    //     return new CubeGrid(cube.pos, cube.size, rows, cols, layers)
    // }

    get cellCount() {
        return this.rows * this.cols * this.layers
    }

    get cellSize() {
        return [this.size[0] / this.cols, this.size[1] / this.rows, this.size[2] / this.layers]
    }

    cubes(): Cube[] {
        let [cellWidth, cellHeight, cellDepth] = this.cellSize

        let grid = []
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                for (let k = 0; k < this.layers; k++) {
                    grid.push(this.generateCell(i, j, k, cellWidth, cellHeight, cellDepth))
                }
            }
        }
        return grid
    }

    // centers(): Vec3[] {
    //     let [cellWidth, cellHeight, cellDepth] = this.cellSize

    //     let centers: Vec3[] = []
    //     for (let i = 0; i < this.rows; i++) {
    //         for (let j = 0; j < this.cols; j++) {
    //             for (let k = 0; k < this.layers; k++) {
    //                 let x = this.pos[0] + j * cellWidth + cellWidth / 2
    //                 let y = this.pos[1] + i * cellHeight + cellHeight / 2
    //                 let z = this.pos[2] + k * cellDepth + cellDepth / 2
    //                 centers.push([x, y, z])
    //             }
    //         }
    //     }
    //     return centers
    // }

    // cells(): GridCell3D[] {
    //     let [cellWidth, cellHeight, cellDepth] = this.cellSize

    //     let cells: GridCell3D[] = []
    //     let index = 0
    //     for (let i = 0; i < this.rows; i++) {
    //         for (let j = 0; j < this.cols; j++) {
    //             for (let k = 0; k < this.layers; k++) {
    //                 let x = this.pos[0] + j * cellWidth
    //                 let y = this.pos[1] + i * cellHeight
    //                 let z = this.pos[2] + k * cellDepth
    //                 cells.push({
    //                     row: i,
    //                     col: j,
    //                     layer: k,
    //                     index: index++,
    //                     t: index / this.cellCount,
    //                     pos: [x, y, z],
    //                     size: [cellWidth, cellHeight, cellDepth],
    //                     center: [x + cellWidth / 2, y + cellHeight / 2, z + cellDepth / 2],
    //                     cube: this.generateCell(i, j, k, cellWidth, cellHeight, cellDepth),
    //                 })
    //             }
    //         }
    //     }
    //     return cells
    // }

    private generateCell(
        row: number,
        col: number,
        layer: number,
        cellWidth: number,
        cellHeight: number,
        cellDepth: number
    ): Cube {
        const halfSizeX = this.size[0] / 2
        const halfSizeY = this.size[1] / 2
        const halfSizeZ = this.size[2] / 2

        let x = this.center[0] - halfSizeX + col * cellWidth + cellWidth / 2
        let y = this.center[1] - halfSizeY + row * cellHeight + cellHeight / 2
        let z = this.center[2] - halfSizeZ + layer * cellDepth + cellDepth / 2

        return new Cube([x, y, z], [cellWidth, cellHeight, cellDepth])
    }
}
