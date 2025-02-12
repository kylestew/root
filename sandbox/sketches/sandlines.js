import { createCanvas } from '../../dist/canvas'

import { color } from 'root/color'
import { random, gaussian, pareto } from 'root/random'

import { Line, Circle, Rectangle, Quadratic, pointAt } from 'root/geo'

import { fuzz, sand } from 'root/mark'

class SandSweeper {
    // http://www.complexification.net/gallery/machines/sandstroke/appletm/sandStrokem.pde
}

class SandStroker {
    constructor(color) {
        this.gain = random(0.09, 0.01)
        this.color = color
        // Add frequency variation for density pattern
        this.frequency = random(4, 12)
        this.phase = 0
    }

    onePass(x, y, ox, oy) {
        // Modulate gain for natural variation
        this.gain += random(-0.05, 0.05)
        const maxGain = 1.0
        this.gain = Math.max(0, Math.min(maxGain, this.gain))

        this.frequency += random(-0.2, 0.2)

        // Add slight random offset to line endpoints for variation
        const jitter = 0.02
        // const x1 = x + random(-jitter, jitter)
        // const y1 = y + random(-jitter, jitter)
        // const x2 = ox + random(-jitter, jitter)
        // const y2 = oy + random(-jitter, jitter)

        const x1 = x
        const y1 = y
        const x2 = ox
        const y2 = oy

        // Calculate base number of grains based on line length
        const dx = x2 - x1
        const dy = y2 - y1
        const length = Math.sqrt(dx * dx + dy * dy)
        const baseGrainCount = Math.floor(length * 256)

        const grains = []
        for (let i = 0; i < baseGrainCount; i++) {
            const t = i / (baseGrainCount - 1)

            // Use sine wave with varying frequency and phase for density
            const densityMultiplier = (Math.sin(t * Math.PI * this.frequency + this.phase) + 1) / 2

            if (Math.random() < densityMultiplier) {
                const px = x1 + dx * t
                const py = y1 + dy * t
                grains.push([px, py])
            }
        }

        // Update phase and frequency for next pass
        this.phase += random(0.1, 0.5)
        this.frequency += random(-0.2, 0.2)
        this.frequency = Math.max(2, Math.min(16, this.frequency))

        return grains
    }
}

function sandlines(canvas, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette
    const cmd = createCanvas(canvas.width, canvas.height, canvas, [-1, 1])
    cmd.clear(background)

    var line = new Line([-0.5, -0.5], [0.5, 0.5])
    // shape | noise mult | noise scale | noise walk | min step | deviation | passes
    let grains = sand(line, 0.005, 3.0, 0.0, 0.002, 0.008, 48)
    // Draw multiple layers of sand
    // var grains = stroker.manyPasses(128)
    cmd.draw(grains, { fill: primary + '22', weight: 0.002 })

    // // circle
    // const circ = new Circle([0, 0], 0.6)
    // stroker = new SineStroke(circ, color(palette.primary))
    // grains = stroker.manyPasses(128)
    // cmd.draw(grains, { fill: palette.primary + '99', weight: 0.001 })

    // line
    line = new Line([0.5, -0.5], [-0.5, 0.5])
    grains = fuzz(line, 4096 * 2, 0.008, () => Math.random())
    // let grains = sand(line, 4096, 0.004, () => gaussian(0.5, 0.3))
    cmd.draw(grains, { fill: primary + '22', weight: 0.002 })

    // NO POINT AT for quadratic
    // curves
    // const tick = 9.0
    // let pts = [
    //     [-0.75, -0.75],
    //     [1.0, -0.5],
    //     [0.75, 0.75],
    // ]
    // const curve0 = new Quadratic(pts)
    // grains = sand(curve0, 4096, 0.004)
    // cmd.draw(grains, { fill: accent + '99', weight: 0.001 })
}
sandlines.title = 'Sandlines'
export { sandlines }

/*
window.meta = {
    title: 'Sandlines',
    description: '',
    refLink: 'https://inconvergent.net/2017/grains-of-sand',
}
*/
