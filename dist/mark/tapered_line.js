import { Line, pointAt } from '../geo/index';
import { mapRange } from '../math/index';
export function taperedLine(line, weights) {
    const segCount = Math.round(line.length * 20);
    const segmentLength = 1.0 / segCount;
    let segments = [];
    for (let i = 0; i < segCount; i++) {
        const progress = i / segCount;
        const weigth = mapRange(progress, 0, 1, weights[0], weights[1]);
        const lineSeg = new Line(pointAt(line, progress), pointAt(line, progress + segmentLength), { weight: weigth });
        segments.push(lineSeg);
    }
    return segments;
}
//# sourceMappingURL=tapered_line.js.map