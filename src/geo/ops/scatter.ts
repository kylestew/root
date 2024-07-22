import { Shape, Vec2 } from '../types'
import { bounds } from './bounds'
import { pointInside } from './pointInside'
import { randomPoint } from '../../random/random'

/**
 * Produces `num` random points for which {@link pointInside} succeeds for the
 * given `shape`. Shape must implement `pointInside` and `bounds` methods.
 *
 * @param shape
 * @param num
 */
export function scatter(shape: Shape, num: number) {
    const b = bounds(shape)
    if (!b) return

    const mi = b.pos
    const mx = b.max

    let out = []
    while (num-- > 0) {
        while (true) {
            const p: Vec2 = randomPoint(mi, mx)
            if (pointInside(shape, p)) {
                out.push(p)
                break
            }
        }
    }
    return out
}
