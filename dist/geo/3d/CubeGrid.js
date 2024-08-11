import { Cube } from './Cube.js';
export class CubeGrid {
    center;
    size;
    rows;
    cols;
    layers;
    constructor(center, size, rows, cols, layers) {
        this.center = center;
        this.size = size;
        this.rows = rows;
        this.cols = cols;
        this.layers = layers;
    }
    // static withCube(cube: Cube, rows: number, cols: number, layers: number) {
    //     return new CubeGrid(cube.pos, cube.size, rows, cols, layers)
    // }
    get cellCount() {
        return this.rows * this.cols * this.layers;
    }
    get cellSize() {
        return [this.size[0] / this.cols, this.size[1] / this.rows, this.size[2] / this.layers];
    }
    cubes() {
        let [cellWidth, cellHeight, cellDepth] = this.cellSize;
        let grid = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                for (let k = 0; k < this.layers; k++) {
                    grid.push(this.generateCell(i, j, k, cellWidth, cellHeight, cellDepth));
                }
            }
        }
        return grid;
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
    generateCell(row, col, layer, cellWidth, cellHeight, cellDepth) {
        const halfSizeX = this.size[0] / 2;
        const halfSizeY = this.size[1] / 2;
        const halfSizeZ = this.size[2] / 2;
        let x = this.center[0] - halfSizeX + col * cellWidth + cellWidth / 2;
        let y = this.center[1] - halfSizeY + row * cellHeight + cellHeight / 2;
        let z = this.center[2] - halfSizeZ + layer * cellDepth + cellDepth / 2;
        return new Cube([x, y, z], [cellWidth, cellHeight, cellDepth]);
    }
}
//# sourceMappingURL=CubeGrid.js.map