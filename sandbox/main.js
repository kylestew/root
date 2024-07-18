import { createGLCanvas, createOffscreenCanvas } from 'root/canvas'
import { Line } from '../dist/geo'
import { weightedRandom, pickRandom, gaussian } from 'root/random'
// import { Grid, Circle, offset, withAttribs } from 'root/geo'

import vertShaderSource from './basic.vert?raw'
import fragShaderSource from './crop_circles.frag?raw'

const mainCanvas = document.getElementById('mainCanvas')

const gl = createGLCanvas(1200, 1600, mainCanvas)
const shader = gl.loadShader(vertShaderSource, fragShaderSource)

const canvasA = createOffscreenCanvas(1200, 1600, [-1, 1])
const canvasB = createOffscreenCanvas(1200, 1600, [-1, 1])

canvasA.clear('#ff0000')
canvasB.clear('#00ff00')

// (1) Create a diagonal line
// random forward or reverse angle, randomized length
const lineLength = weightedRandom([1.4, 1.6, 1.8], [2, 6, 1])
const splitAngle = pickRandom([(2.0 * Math.PI) / 3 + gaussian(0, 0.15), Math.PI / 3 + gaussian(0, 0.15)])
const splitCenter = [gaussian(0, 0.08), gaussian(0, 0.08)]
const diagonal = Line.withCenter(splitCenter, splitAngle, lineLength)
const inverted = Math.random() < 0.1

// DRAW IT
gl.clear([0, 0, 0, 1])
gl.useShader(shader)

gl.useTexture(gl.TEXTURE0, 'tex0', canvasA.canvas)
gl.useTexture(gl.TEXTURE1, 'tex1', canvasB.canvas)

// NOTE: this is hardcoded for the given canvas ratio
const canvasTransform = new Float32Array([2.0, 0.0, 0.0, 0.0, 2.0 * 1.333, 0.0, -1.0, -1.333, 1.0])
gl.setUniform('canvasTransform', canvasTransform)
gl.setUniform('center', splitCenter)
gl.setUniform('angle', splitAngle)
gl.setUniform('smoothness', 0.002)
gl.setUniform('invert', inverted)

gl.drawScreen()
