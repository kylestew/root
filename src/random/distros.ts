import { full } from '../array/index'
import { random, gaussian } from './random'

export function uniform1D(count: number) {
    return full(count, () => random(0, 1))
}
export function uniform2D(count: number) {
    return full(count, () => [random(0, 1), random(0, 1)])
}

export function gaussian1D(count: number, center: number, stdDev: number) {
    return full(count, () => gaussian(center, stdDev))
}
export function gaussian2D(count: number, center: [number, number], stdDev: [number, number]) {
    return full(count, () => [gaussian(center[0], stdDev[0]), gaussian(center[1], stdDev[1])])
}
