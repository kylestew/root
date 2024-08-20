// MATH
export { lerp, lerpPt, midPt, mapRange, mapRange2D, map01toRect } from './math';
export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
// VECTOR
export { add, sub, mul, div } from './vectors';
export { addN, subN, mulN, divN } from './vectors';
export { neg, floor, ceil, clamp01 } from './vectors';
export { normalize, dist, mag, dot, reflect } from './vectors';
export { identity, matTranslate, matRotate, matScale, matMultiply } from './matrix';
// EASINGS
export * from './easings';
//# sourceMappingURL=index.js.map