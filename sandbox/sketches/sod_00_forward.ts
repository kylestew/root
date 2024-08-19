import { Line, Circle, pointAt } from 'root/geo'
import { mapRange } from 'root/math'
import { random } from 'root/random'
import { simplex3 } from 'root/random'
import { color } from 'root/color'
import { createGLCanvas, createOffscreenCanvas } from 'root/canvas'

import { simpleVertShader } from 'root/pixel/shaders'
import fragShaderSource from './shaders/noisy_texture.frag?raw'

export function taperedLine(line: Line, weights: [number, number]): Line[] {
    const segCount = Math.round(line.length * 400)
    const segmentLength = 1.0 / segCount

    let segments: Line[] = []
    for (let i = 0; i < segCount; i++) {
        const progress = i / segCount
        const weigth = mapRange(progress, 0, 1, weights[0], weights[1])
        const lineSeg = new Line(pointAt(line, progress), pointAt(line, progress + segmentLength), { weight: weigth })
        segments.push(lineSeg)
    }
    return segments
}

export function sketch(canvas, palette) {
    const { background, primary, secondary, dark } = palette

    // main GL canvas
    const w = canvas.width
    const h = canvas.height
    const gl = createGLCanvas(w, h, canvas)
    const shader = gl.loadShader(simpleVertShader, fragShaderSource)
    if (!shader) return

    // offscreen canvas to draw design in
    const cmd = createOffscreenCanvas(w, h, [-1, 1])
    cmd.clear(background)

    let t = 0
    const circle = new Circle([0, 0], 0.5)
    const tOffset = random(0, 1)
    while (t < 1.0 - 0.008) {
        // baseline
        const [x, y] = pointAt(circle, t + tOffset)
        const line = new Line([0, 0], [x, y])

        // extend line
        const lengthMult = 0.5 + Math.abs(simplex3(x, y, Date.now()))
        const extPoint = pointAt(line, lengthMult)
        const extendedLine = new Line([0, 0], extPoint)

        // draw as tapered line
        const upper = extendedLine.length * 0.008
        // const tapered = taperedLine(extendedLine, [random(0.0005, 0.001), upper])
        const tapered = taperedLine(extendedLine, [0.00003, upper])
        cmd.draw(tapered, { stroke: primary, lineCap: 'round' })

        // draw a "pen up" circle at the end of the line
        const rad = upper / 2 + random(0.0008, 0.0014)
        const circ = new Circle(pointAt(extendedLine, 1), rad)
        cmd.draw(circ, { fill: primary })

        t += random(0.008, 0.016)
    }

    gl.clear(color('#000000').toGLSL())
    gl.useShader(shader)

    gl.useTexture(gl.TEXTURE0, 'tex0', cmd.canvas)

    gl.drawScreen()
}
