export type Mat2 = [number, number, number, number, number, number];
export declare function identity(): Mat2;
export declare function matTranslate(mat: Mat2, tx: number, ty: number): Mat2;
export declare function matRotate(mat: Mat2, pivot: [number, number], angle: number): Mat2;
export declare function matScale(mat: Mat2, scale: [number, number]): Mat2;
export declare function matMultiply(m1: Mat2, m2: Mat2): Mat2;
