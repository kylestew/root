import { rotate } from '../tools/geo'
import { full } from '../tools/array'
import { random, gaussian, pareto, pickRandom } from '../tools/random'
import { draw } from '../tools/draw'
import { animate } from '../tools/canvas-utils'
import { WebMidi } from 'webmidi'
import { midiControllerInputs } from '../tools/canvas-utils/midi-input'

export function polarToCartesianDistro(ctx, palette) {
    let { background, primary, secondary, accent, dark, neutral } = palette

    ctx.setRange(-1.18, 1.18)

    const sampleCount = 40000
    const color = primary + '99'
    const clearColor = background + '11'
    const weight = 0.001

    const midiValues = midiControllerInputs()

    function render(timestamp) {
        const timestep = timestamp * 0.0001
        ctx.clear(clearColor)

        const a = midiValues.cc0 ?? 1.0
        const b = midiValues.cc1 ?? 0.0

        const rotTheta = midiValues.cc11 ?? 0.0
        const a0 = midiValues.cc12 ?? 0.0
        const a1 = midiValues.cc13 ?? 1.0
        const t0 = midiValues.cc14 ?? 0.0
        const t1 = midiValues.cc15 ?? 1.0

        const placePt = () => {
            // 1) Generate a random angle t between 0 and 2π
            let t = random(-a0 * Math.PI * 2.0, Math.PI * 2.0 * -a1)
            // const t = gaussian(Math.sin(timestamp * 0.001) * Math.PI, Math.PI / 8.0)
            // const t = pareto(0.001, 0.2) + Math.sin(timestamp * 0.0001) * Math.PI

            // 2) Generate a random radius R (square root gives even distribution of points along radius)
            let r = Math.sqrt(random(t0, t1))

            // 3) Convert polar coordinates (r, t) to Cartesian coordinates (x, y) using a PARAMETRIC EQUATION
            // CIRCLE
            // const x = r * Math.cos(t)
            // const y = r * Math.sin(t)

            // EIGHT CURVE
            // const x = r * Math.sin(t)
            // const y = r * Math.sin(t) * Math.cos(t)

            // ==================================================

            // ???
            r = Math.cos(r * t * a + b)
            const x = r * Math.cos(t)
            const y = r * Math.sin(t)

            // DELTOID CURVE
            // const x = 0.2 * r * Math.cos(t) + Math.cos(2 * t)
            // const y = 0.2 * r * Math.sin(t) - Math.sin(2 * t)

            // SPIROGRAPH
            // const R = 1.23
            // const d = 3.333
            // const x = ((R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)) / 4.0
            // const y = ((R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)) / 4.0

            // ???
            // const x = r * Math.cos(t)
            // const y = r * Math.sin(t) * Math.sin((x / timestep) * 9.0)

            // Hypocycloid
            // const R = 3
            // const x = (R - r) * Math.cos(t) + r * Math.cos(((R - r) / r) * t)
            // const y = (R - r) * Math.sin(t) - r * Math.sin(((R - r) / r) * t)

            // ASTEROID
            // const x = r * Math.pow(Math.cos(t), 3)
            // const y = r * Math.pow(Math.sin(t), 3)

            // const x = r * Math.sqrt(t) * Math.cos(t)
            // const y = r * Math.sqrt(t) * Math.sin(t)

            // const x = (Math.sqrt(2) * Math.cos(t)) / (Math.sin(t) * Math.sin(t) + 1)
            // const y = (Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.sin(t) * Math.sin(t) + 1)

            // const R = 3
            // const x = (R + r) * Math.cos(t) - r * Math.cos(((R + r) / r) * t)
            // const y = (R + r) * Math.sin(t) - r * Math.sin(((R + r) / r) * t)

            return rotate([x, y], -rotTheta * 2.0 * Math.PI)
        }

        const pts = full(sampleCount, placePt)
        draw(ctx, pts, { fill: color, weight })
    }
    setTimeout(() => {
        animate(20, render)
    }, 500.0)
}
