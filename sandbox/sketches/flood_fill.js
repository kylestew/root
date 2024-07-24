import { Rectangle } from 'root/geo'
import { full } from 'root/array'
import { random } from 'root/random'
import { color } from 'root/color'
import { createOffscreenCanvas } from 'root/canvas'
import { floodFillCanvas } from 'root/tex'

function floodFill(cmd, palette) {
    let { background, primary } = palette

    cmd.clear(background)

    // create a bunch of randomly sized and positioned rectangles
    const rectCount = 18
    const rects = full(rectCount, () =>
        Rectangle.withCenter([random(-1.5, 1.5), random(-1.5, 1.5)], [random(0.4, 1.0), random(0.4, 1.1)])
    )

    // render the rects into offscreen context
    // if we use the same color for the boundaries as we are going to fill with, it won't color in the boundaries
    const offCmd = createOffscreenCanvas(cmd.canvas.width, cmd.canvas.height, [-1, 1])
    offCmd.draw(rects, { stroke: primary, weight: 0.05 })

    // select a random position to start fill from
    // run flood fill algorithm
    // sections in the offscreen context will be filled with the primary color in the current onscreen context
    // do until we are able to fill an area ( or we hit a limit )
    // for (let i = 0; i < 1; i++) {
    const pt = [random(-0.8, 0.8), random(-0.8, 0.8)]
    // if (
    floodFillCanvas(offCmd.ctx, cmd.toPixelSpace(pt), color(primary).toArray(), cmd.ctx)
    // ) {
    // break
    // }
    // }
}

floodFill.title = 'Flood Fill'
export { floodFill }
