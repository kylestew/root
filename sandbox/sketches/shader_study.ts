import { Circle } from 'root/geo'
import { createCanvas, createGLCanvas, createOffscreenCanvas } from 'root/canvas'
import { textureLoader } from 'root/pixel'

import { simpleVertShader } from 'root/pixel/shaders'
import fragShaderSource from './shaders/paper_examples.frag?raw'
// import fragShaderSource from './shaders/sandbox.frag?raw'

import valueNoiseTexUrl from '../assets/gray_noise.png'

export async function sketch(canvas, palette) {
    // main GL canvas
    const w = canvas.width
    const h = canvas.height
    const gl = createGLCanvas(w, h, canvas)
    const shader = gl.loadShader(simpleVertShader, fragShaderSource)
    if (!shader) return

    // offscreen canvas to draw design in
    const cmd = createOffscreenCanvas(w, h, [-1, 1])
    cmd.clear('#ffffff')

    const circ = new Circle([0, 0], 0.4)
    cmd.draw(circ, { fill: '#f00' })

    const noiseTex = await textureLoader(valueNoiseTexUrl)

    gl.useShader(shader)

    gl.useTexture(gl.TEXTURE0, 'noiseTex', noiseTex)
    gl.useTexture(gl.TEXTURE1, 'tex0', cmd.canvas)

    gl.drawScreen()
}
