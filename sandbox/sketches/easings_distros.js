import { offset } from '../tools/geo'
import { Grid } from '../tools/geo/extended'
import { draw } from '../tools/draw'

import {
    linear,
    easeInQuad,
    easeInExpo,
    easeOutExpo,
    easeInOutSine,
    easeInSine,
    easeOutElastic,
    easeInOutBounce,
    easeInBounce,
    easeOutQuint,
    easeOutSine,
    easeOutBounce,
} from '../tools/math/easings'
import {
    remapToRect, //
    uniform2D,
    gaussian2D,
    pareto2D,
} from '../tools/random/distros'

export function easingsDistributions(ctx, palette) {
    let { background, primary, secondary, accent, dark, neutral } = palette

    const grid = new Grid([-1, -1], [2, 2], 2, 2)
    const rects = grid.rects().map((r) => offset(r, -0.02))

    const sampleCount = 25000
    const color = primary + 'AA'

    function applyEasings(easeX, easeY) {
        return function (pt) {
            return [easeX(pt[0]), easeY(pt[1])]
        }
    }

    // 1) uniform: [easeInSine, _]
    let pts = uniform2D(sampleCount).map(applyEasings(easeInOutSine, linear))
    draw(ctx, remapToRect(pts, rects[0], true), { fill: color, weight: 0.002 })

    // 2) uniform: [easeInSine, _]
    pts = uniform2D(sampleCount).map(applyEasings(easeInOutSine, linear))
    draw(ctx, remapToRect(pts, rects[1], true), { fill: color, weight: 0.002 })

    // 3) gaussian: [easeInSine, _]
    pts = gaussian2D(sampleCount, [0.5, 0.5], [0.2, 0.2]).map(applyEasings(easeInSine, linear))
    draw(ctx, remapToRect(pts, rects[2], true), { fill: color, weight: 0.002 })

    // 4) ???
    pts = uniform2D(sampleCount).map(applyEasings(easeOutBounce, linear))
    draw(ctx, remapToRect(pts, rects[3], true), { fill: color, weight: 0.002 })
}
