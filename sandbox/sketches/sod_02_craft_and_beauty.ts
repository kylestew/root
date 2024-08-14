import { Circle, Ellipse } from 'root/geo'
// import { mapRange } from 'root/math'
// import { random } from 'root/random'
// import { simplex3 } from 'root/random'
import { color } from 'root/color'
import { createCanvas, createGLCanvas, createOffscreenCanvas } from 'root/canvas'

import { simpleVertShader } from 'root/pixel/shaders'
import fragShaderSource from './shaders/noisy_texture.frag?raw'

export function sketch(canvas, palette) {
    const { background, primary, secondary, dark } = palette

    /*
    // main GL canvas
    const w = canvas.width
    const h = canvas.height
    const gl = createGLCanvas(w, h, canvas)
    const shader = gl.loadShader(simpleVertShader, fragShaderSource)
    if (!shader) return

    // offscreen canvas to draw design in
    const cmd = createOffscreenCanvas(w, h, [-1, 1])
    cmd.clear(background)
    */

    const cmd = createCanvas(canvas.width, canvas.height, canvas)
    cmd.clear(background)

    const circ = new Circle([0, 0], 0.4)
    cmd.draw(circ, { fill: secondary })

    const el = new Ellipse([0, 0], [0.8, 0.3])
    cmd.draw(el, { stroke: primary, weight: 0.01 })

    // let t = 0
    // const circle = new Circle([0, 0], 0.5)
    // const tOffset = random(0, 1)
    // while (t < 1.0 - 0.008) {
    //     // baseline
    //     const [x, y] = pointAt(circle, t + tOffset)
    //     const line = new Line([0, 0], [x, y])

    //     // extend line
    //     const lengthMult = 0.5 + Math.abs(simplex3(x, y, Date.now()))
    //     const extPoint = pointAt(line, lengthMult)
    //     const extendedLine = new Line([0, 0], extPoint)

    //     // draw as tapered line
    //     const upper = extendedLine.length * 0.008
    //     // const tapered = taperedLine(extendedLine, [random(0.0005, 0.001), upper])
    //     const tapered = taperedLine(extendedLine, [0.00003, upper])
    //     cmd.draw(tapered, { stroke: primary, lineCap: 'round' })

    //     t += random(0.008, 0.016)
    // }

    // gl.clear(color('#000000').toGLSL())
    // gl.useShader(shader)
    // gl.useTexture(gl.TEXTURE0, 'tex0', cmd.canvas)
    // gl.drawScreen()
}
