import { Circle } from '../tools/geo'
import { linspace, range } from '../tools/array'
import { random, gaussian, pareto } from '../tools/random'
import { easeInQuad, easeOutCubic, easeInCubic } from '../tools/math/easings'
import { draw } from '../tools/draw'

/* https://www.katevassgalerie.com/print/p/jared-tarbell-node-to-node */
export function tarbelNodeToNode(ctx, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette

    const canvasSpan = ctx.canvasInfo.span

    // for evenly spaced rad stops
    const ringCount = 132
    const dotDensity = 128
    const dots = linspace(0.0, 1.0, ringCount).map((t) => {
        // TODO: use a different distribution for rad
        const rad = t * canvasSpan * 0.5
        // const rad = easeInCubic(t) * canvasSpan * 0.5

        // this defines number of points on ring based on circumference
        const circumference = 2.0 * Math.PI * rad
        const numPoints = Math.round(circumference * dotDensity)
        const thetaSpacing = (2.0 * Math.PI) / numPoints

        // different patterns achieved by offsetting the start of the ring (so they don't all start at theta = 0)
        // const startOffset = t // regular
        const startOffset = gaussian(0, 0.333)
        // const startOffset = pareto(0.01, 0.1)

        return range(startOffset, startOffset + 2.0 * Math.PI, thetaSpacing).map((theta) => {
            const x = rad * Math.cos(theta)
            const y = rad * Math.sin(theta)
            return new Circle([x, y], random(0.0015, 0.003))
        })
    })

    // draw(ctx, dots)
    draw(ctx, dots, { fill: primary })
}
