export declare const add: (v1: number[], v2: number[]) => number[];
export declare const sub: (v1: number[], v2: number[]) => number[];
export declare const mul: (v1: number[], v2: number[]) => number[];
export declare const div: (v1: number[], v2: number[]) => number[];
export declare const addN: (v: number[], n: number) => number[];
export declare const subN: (v: number[], n: number) => number[];
export declare const mulN: (v: number[], n: number) => number[];
export declare const divN: (v: number[], n: number) => number[];
export declare const neg: (v: number[]) => number[];
export declare const floor: (v: number[]) => number[];
export declare const ceil: (v: number[]) => number[];
export declare const clamp01: (v: number[]) => number[];
export declare const normalize: (v: number[]) => number[];
export declare const dist: (v1: number[], v2: number[]) => number;
export declare const mag: (v: number[]) => number;
export declare const dot: (v1: number[], v2: number[]) => number;
/**
 * Reflects a vector around a given normal.
 * @param {number[]} I - The incident vector.
 * @param {number[]} N - The normal vector.
 * @returns {number[]} The reflected vector.
 */
export declare function reflect(I: number[], N: number[]): number[];
