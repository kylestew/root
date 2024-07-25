import { Line, Circle, Rectangle, Grid } from '../geo/index';
import { centroid, asPoints, bounds } from '../geo/index';
import { addN } from '../math/index';
// shape: bounds shape (must implement bounds and center)
// count: number of lines in shape
export function lines(shape, count, theta = Math.PI / 4, color = 'black') {
    const colors = Array.isArray(color) ? color : [color];
    // largest side defines number of lines
    const size = bounds(shape).size;
    const center = centroid(shape);
    const largestSide = Math.max(size[0], size[1]);
    const lineLength = largestSide * 3;
    const strokeWidth = largestSide / (count - 1);
    // create line that is 3x the length of the larges side (so we don't lose any lines at angles)
    const line = Line.withCenter(center, theta, lineLength);
    // split into evenly spaced points, place a line at an angle at each point
    return asPoints(line, count * 3).map((pt, index) => {
        // Determine the color for the current line
        const currentColor = colors[index % colors.length];
        return Line.withCenter(pt, Math.PI / 2.0 + theta, 10, { stroke: currentColor, weight: strokeWidth });
    });
}
// export function waveyLines(count, amplitude, color = 'black', width = 0.05) {
//     // cols = 200
// rows = 50
// cellH = h / rows
// cellW = w / cols
// freq = randomInt(2, 10)
// // strokeWeight((h/rows)/4)
// for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//         sinI = map(x, 0, cols, 0, 360)
//         offset = sin(sineI * freq)
//         // b.point(x*cellW, y*cellH)
//     }
// }
// }
export function checkers(shape, rows = 10, columns = 10, color = 'black') {
    const colors = Array.isArray(color) ? color : [color];
    // convert bounding rect to grid and create checkers in it
    const rect = bounds(shape);
    const grid = Grid.withRect(rect, rows, columns);
    return grid.cells().map(({ row, col, pos, size }) => {
        const color = colors[(col + row) % colors.length];
        // overcome small gaps in checkers
        return new Rectangle(pos, addN(size, 0.001), { fill: color });
    });
}
export function dotGrid(shape, sideCount = 10, radMult = 0.5, color = 'black') {
    const colors = Array.isArray(color) ? color : [color];
    // convert bounding rect to grid and create checkers in it
    const rect = bounds(shape);
    const grid = Grid.withRect(rect, sideCount, sideCount);
    const baseR = (rect.size[0] / sideCount / 2) * radMult;
    return grid.cells().map(({ row, col, center }) => {
        const color = colors[(col + row) % colors.length];
        return new Circle(center, baseR, { fill: color });
    });
}
// triangles (triangle grid)
// hexagons
// Zig Zag lines
// rectangle tiles
// goto 10
// noise lines - perline noise wave field
// topo lines - same as above
//# sourceMappingURL=pattern_fills.js.map