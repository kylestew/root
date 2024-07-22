import { Polygon } from '../tools/geo/'
import { simplex3 } from '../tools/random/noise'
import { mapRange } from '../tools/math'
import { linspace } from '../tools/array'
import { chaikinCurve } from '../tools/algos/chaikin'
import { draw } from '../tools/draw'
import { animate } from '../tools/canvas-utils'

export function treeRings(ctx, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette
    const colors = [primary, secondary, accent]

    function render(timestep) {
        ctx.clear(background)
        function makeRing(r, noiseMult, noiseScale, steps, zStep) {
            // use noise as the radial offset for each ring position
            return new Polygon(
                chaikinCurve(
                    linspace(0, 2.0 * Math.PI, steps).map((theta) => {
                        // sample noise at base position
                        let x = r * Math.cos(theta)
                        let y = r * Math.sin(theta)
                        const offsetR = noiseMult * simplex3(noiseScale * x, noiseScale * y, zStep)

                        const newR = Math.max(r + offsetR, 0.01)

                        // add offset to position
                        x = newR * Math.cos(theta)
                        y = newR * Math.sin(theta)

                        return [x, y]
                    }),
                    2
                )
            )
        }

        const step = timestep * 0.0005
        const count = 64
        for (let i = 0; i < count; i++) {
            const r = mapRange(i, 0, count, 0.1, 2.0)
            const color = colors[i % colors.length]
            draw(ctx, makeRing(r, 0.1, 3.0, 128, step), { stroke: color, weight: 0.02 })
        }
    }
    animate(10, render)
}
