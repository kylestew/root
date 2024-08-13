import { Cube } from './Cube.js';
import { centroid } from '../ops/centroid.js';
export class CubeGrid {
    pos;
    size;
    rows;
    cols;
    layers;
    constructor(center, size, rows, cols, layers) {
        const halfWidth = size[0] / 2;
        const halfHeight = size[1] / 2;
        const halfDepth = size[2] / 2;
        const pos = [center[0] - halfWidth, center[1] - halfHeight, center[2] - halfDepth];
        this.pos = pos;
        this.size = size;
        this.rows = rows;
        this.cols = cols;
        this.layers = layers;
    }
    static withCube(cube, rows, cols, layers) {
        return new CubeGrid(centroid(cube), cube.size, rows, cols, layers);
    }
    get cellCount() {
        return this.rows * this.cols * this.layers;
    }
    get cellSize() {
        return [this.size[0] / this.cols, this.size[1] / this.rows, this.size[2] / this.layers];
    }
    centers() {
        return this.cells().map((cell) => cell.center);
    }
    cubes() {
        return this.cells().map((cell) => cell.cube);
    }
    cells() {
        let [cellWidth, cellHeight, cellDepth] = this.cellSize;
        let cells = [];
        let index = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                for (let k = 0; k < this.layers; k++) {
                    let cx = this.pos[0] + j * cellWidth + cellWidth / 2;
                    let cy = this.pos[1] + i * cellHeight + cellHeight / 2;
                    let cz = this.pos[2] + k * cellDepth + cellDepth / 2;
                    const cube = new Cube([cx, cy, cz], [cellWidth, cellHeight, cellDepth]);
                    cells.push({
                        row: i,
                        col: j,
                        layer: k,
                        index: index++,
                        t: index / this.cellCount,
                        center: [cx, cy, cz],
                        size: [cellWidth, cellHeight, cellDepth],
                        cube,
                    });
                }
            }
        }
        return cells;
    }
}
//# sourceMappingURL=CubeGrid.js.map