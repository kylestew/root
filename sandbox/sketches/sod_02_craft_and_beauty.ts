import { Circle, Ellipse, Rectangle, asPath, rotate } from 'root/geo'
import { linspace } from 'root/array'
import { createGLCanvas, createOffscreenCanvas } from 'root/canvas'
import { textureLoader } from 'root/pixel'

import { simpleVertShader } from 'root/pixel/shaders'
import fragShaderSource from './shaders/sod_paper_text.frag?raw'

import valueNoiseTexUrl from '../assets/gray_noise.png'

export async function sketch(canvas, palette) {
    const { background, primary, secondary, dark } = palette

    // main GL canvas
    const w = canvas.width
    const h = canvas.height
    const gl = createGLCanvas(w, h, canvas)
    const shader = gl.loadShader(simpleVertShader, fragShaderSource)
    if (!shader) return

    // offscreen canvas to draw design in
    const cmd = createOffscreenCanvas(w, h, [-1, 1])
    cmd.clear('#00000000') // draw over clear

    function drawEllipses() {
        const el = new Ellipse([0, 0], [0.8, 0.2])
        linspace(-Math.PI / 18.0, Math.PI / 18.0, 12).forEach((theta, idx) => {
            cmd.ctx.save()
            cmd.ctx.rotate(theta)
            const weight = idx == 0 || idx == 11 ? 0.008 : 0.004
            cmd.draw(el, { stroke: primary, weight: weight })
            cmd.ctx.restore()
        })
    }

    // draw top half of ellipses
    const topRect = new Rectangle([0, 0.5], [2, 1])
    cmd.ctx.save()
    cmd.ctx.clip(asPath(topRect))
    drawEllipses()
    cmd.ctx.restore()

    // draw inner object
    const circ = new Circle([0, 0], 0.4)
    // cmd.draw(circ, { fill: secondary, stroke: dark, weight: 0.05 })
    cmd.draw(circ, { stroke: dark, weight: 0.05 })

    // draw bottom half of ellipses
    const bottomRect = new Rectangle([0, -0.5], [2, 1])
    cmd.ctx.save()
    cmd.ctx.clip(asPath(bottomRect))
    drawEllipses()
    cmd.ctx.restore()

    gl.useShader(shader)
    const noiseTex = await textureLoader(valueNoiseTexUrl)
    gl.useTexture(gl.TEXTURE0, 'noiseTex', noiseTex)
    gl.useTexture(gl.TEXTURE1, 'canvasTex', cmd.canvas)
    gl.drawScreen()
}
