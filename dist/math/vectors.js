/* === VECTOR UTILS ===
 *
 * add - Adds two vectors
 * div - Divides two vectors
 * mul - Multiplies two vectors
 * sub - Subtracts two vectors
 * dot - Dot product of two vectors
 *
 * addN - Adds scalar to vector
 * divN - Divides vector by scalar
 * mulN - Multiplies vector by scalar
 * subN - Subtracts scalar from vector
 * neg - Negate a vector
 */
export const add = (v1, v2) => v1.map((x, i) => x + v2[i]);
export const sub = (v1, v2) => v1.map((val, i) => val - v2[i]);
export const mul = (v1, v2) => v1.map((x, i) => x * v2[i]);
export const div = (v1, v2) => v1.map((x, i) => x / v2[i]);
export const addN = (v, n) => v.map((x) => x + n);
export const subN = (v, n) => v.map((x) => x - n);
export const mulN = (v, n) => v.map((x) => x * n);
export const divN = (v, n) => v.map((x) => x / n);
export const neg = (v) => mulN(v, -1);
export const floor = (v) => v.map(Math.floor);
export const ceil = (v) => v.map(Math.ceil);
export const clamp01 = (v) => v.map((x) => Math.min(1, Math.max(0, x)));
export const normalize = (v) => {
    const length = Math.hypot(...v);
    return length === 0 ? v : divN(v, length);
};
export const dist = (v1, v2) => Math.hypot(...sub(v1, v2));
export const mag = (v) => Math.hypot(...v);
export const dot = (v1, v2) => v1.reduce((acc, val, i) => acc + val * v2[i], 0);
/**
 * Reflects a vector around a given normal.
 * @param {number[]} I - The incident vector.
 * @param {number[]} N - The normal vector.
 * @returns {number[]} The reflected vector.
 */
export function reflect(I, N) {
    const I_norm = normalize(I);
    const N_norm = normalize(N);
    const dotIN = dot(I_norm, N_norm);
    return [I_norm[0] - 2 * dotIN * N_norm[0], I_norm[1] - 2 * dotIN * N_norm[1], I_norm[2] - 2 * dotIN * N_norm[2]];
}
//# sourceMappingURL=vectors.js.map