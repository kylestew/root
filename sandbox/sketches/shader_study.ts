import { createCanvas, createGLCanvas, createOffscreenCanvas } from 'root/canvas'
import { textureLoader } from 'root/pixel'

import { simpleVertShader } from 'root/pixel/shaders'
import fragShaderSource from './shaders/sandbox.frag?raw'

import imageUrl from '../assets/test.png'

export async function sketch(canvas, palette) {
    // main GL canvas
    const w = canvas.width
    const h = canvas.height
    const gl = createGLCanvas(w, h, canvas)
    const shader = gl.loadShader(simpleVertShader, fragShaderSource)
    if (!shader) return

    const tex0 = await textureLoader(imageUrl)

    gl.useShader(shader)
    gl.useTexture(gl.TEXTURE0, 'tex0', tex0)
    gl.drawScreen()
}
