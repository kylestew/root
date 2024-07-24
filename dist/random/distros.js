import { full } from '../array/index';
import { random, gaussian } from './random';
export function uniform1D(count) {
    return full(count, () => random(0, 1));
}
export function uniform2D(count) {
    return full(count, () => [random(0, 1), random(0, 1)]);
}
export function gaussian1D(count, center, stdDev) {
    return full(count, () => gaussian(center, stdDev));
}
export function gaussian2D(count, center, stdDev) {
    return full(count, () => [gaussian(center[0], stdDev[0]), gaussian(center[1], stdDev[1])]);
}
