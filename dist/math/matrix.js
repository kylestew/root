export function identity() {
    return [1, 0, 0, 1, 0, 0];
}
export function matTranslate(mat, tx, ty) {
    const [a, b, c, d, e, f] = mat;
    return [a, b, c, d, e + tx, f + ty];
}
export function matRotate(mat, pivot, angle) {
    const [px, py] = pivot;
    const [a, b, c, d, e, f] = mat;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const newA = a * cos - b * sin;
    const newB = a * sin + b * cos;
    const newC = c * cos - d * sin;
    const newD = c * sin + d * cos;
    const newE = e * cos - f * sin + px - px * cos + py * sin;
    const newF = e * sin + f * cos + py - px * sin - py * cos;
    return [newA, newB, newC, newD, newE, newF];
}
export function matScale(mat, scale) {
    const [sx, sy] = scale;
    const [a, b, c, d, e, f] = mat;
    return [a * sx, b * sx, c * sy, d * sy, e, f];
}
export function matMultiply(m1, m2) {
    const [a1, b1, c1, d1, e1, f1] = m1;
    const [a2, b2, c2, d2, e2, f2] = m2;
    const a = a1 * a2 + c1 * b2;
    const b = b1 * a2 + d1 * b2;
    const c = a1 * c2 + c1 * d2;
    const d = b1 * c2 + d1 * d2;
    const e = a1 * e2 + c1 * f2 + e1;
    const f = b1 * e2 + d1 * f2 + f1;
    return [a, b, c, d, e, f];
}
//# sourceMappingURL=matrix.js.map