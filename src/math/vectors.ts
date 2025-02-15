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

export const add = (v1: number[], v2: number[]) => v1.map((x, i) => x + v2[i])
export const sub = (v1: number[], v2: number[]) => v1.map((val, i) => val - v2[i])
export const mul = (v1: number[], v2: number[]) => v1.map((x, i) => x * v2[i])
export const div = (v1: number[], v2: number[]) => v1.map((x, i) => x / v2[i])

export const addN = (v: number[], n: number) => v.map((x) => x + n)
export const subN = (v: number[], n: number) => v.map((x) => x - n)
export const mulN = (v: number[], n: number) => v.map((x) => x * n)
export const divN = (v: number[], n: number) => v.map((x) => x / n)

export const neg = (v: number[]) => mulN(v, -1)
export const floor = (v: number[]) => v.map(Math.floor)
export const ceil = (v: number[]) => v.map(Math.ceil)
export const clamp01 = (v: number[]) => v.map((x) => Math.min(1, Math.max(0, x)))

export const normalize = (v: number[]) => {
    const length = Math.hypot(...v)
    return length === 0 ? v : divN(v, length)
}
export const dist = (v1: number[], v2: number[]) => Math.hypot(...sub(v1, v2))
export const mag = (v: number[]) => Math.hypot(...v)
export const dot = (v1: number[], v2: number[]) => v1.reduce((acc, val, i) => acc + val * v2[i], 0)

/**
 * Reflects a vector around a given normal.
 * @param {number[]} I - The incident vector.
 * @param {number[]} N - The normal vector.
 * @returns {number[]} The reflected vector.
 */
export function reflect(I: number[], N: number[]) {
    const I_norm = normalize(I)
    const N_norm = normalize(N)
    const dotIN = dot(I_norm, N_norm)
    return [I_norm[0] - 2 * dotIN * N_norm[0], I_norm[1] - 2 * dotIN * N_norm[1], I_norm[2] - 2 * dotIN * N_norm[2]]
}
