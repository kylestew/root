declare function seed(seed: number): void;
declare function simplex2(xin: number, yin: number): number;
declare function simplex3(xin: number, yin: number, zin: number): number;
declare function perlin2(x: number, y: number): number;
declare function perlin3(x: number, y: number, z: number): number;
export { seed, simplex2, simplex3, perlin2, perlin3 };
