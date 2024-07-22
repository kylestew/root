import { Rectangle } from '../tools/geo'
import { color } from '../tools/color'
import { full } from '../tools/array'
import { random } from '../tools/random'
import { floodFillAlgorithm } from '../tools/tex/flood-fill'
import { createOffscreenCanvas } from '../tools/canvas-utils'
import { draw } from '../tools/draw'

export function floodFill(ctx, palette) {
    let { background, primary, secondary, accent, dark, neutral } = palette
    let colors = [primary, secondary, accent, dark, neutral]

    // const [bg, primary, secondary] = palette

    // create a bunch of randomly sized and positioned rectangles
    const rectCount = 18
    const rects = full(rectCount, () =>
        Rectangle.withCenter([random(-1.5, 1.5), random(-1.5, 1.5)], [random(0.4, 1.0), random(0.4, 1.1)])
    )
    // render the rects into offscreen context
    // if we use the same color for the boundaries as we are going to fill with, it won't color in the boundaries
    const offCtx = createOffscreenCanvas(ctx.canvas.width, ctx.canvas.height)
    offCtx.setRange(-1.1, 1.1)
    draw(offCtx, rects, { stroke: primary, weight: 0.05 })
    // draw(ctx, rects, { stroke: primary, weight: 0.05 })

    // select a random position to start fill from
    // run flood fill algorithm
    // sections in the offscreen context will be filled with the primary color in the current onscreen context
    // do until we are able to fill an area ( or we hit a limit )
    for (let i = 0; i < 100; i++) {
        const pt = [random(-0.8, 0.8), random(-0.8, 0.8)]
        if (floodFillAlgorithm(offCtx, pt, color(primary).toArray(), ctx)) {
            break
        }
    }
}
