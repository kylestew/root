type RGB = {
    r: number;
    g: number;
    b: number;
    a: number;
};
type HSL = {
    h: number;
    s: number;
    l: number;
};
export declare function color(value: string | number[] | RGB | HSL): any;
export {};
