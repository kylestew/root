import createCamera from './lib/createCamera.js'
import { defaultPalette } from './lib/palettes.js'

const sinuousWave = ([u, v]) => {
    return Math.sin(u * Math.PI * 2) * 0.5
}

const rippleSurface = ([u, v]) => {
    return Math.sin(u * Math.PI * 4.5) * Math.cos(v * Math.PI * 4.5) * 0.3
}

const radialWave = ([u, v]) => {
    const r = u
    return r * Math.cos(v * Math.PI * 4) * 0.5
}

function createGeometry(fn, subX, subY = subX) {
    const positions = []
    const triangles = []
    const quads = []

    // Increment subdivisions to account for vertices at both start and end points
    // e.g. with 2 subdivisions we need 3 vertices: [0, 0.5, 1]
    subX++
    subY++

    // Loop through Y subdivisions (rows)
    for (let y = 0; y < subY; y++) {
        // Loop through X subdivisions (columns)
        for (let x = 0; x < subX; x++) {
            // Calculate UV coordinates between 0 and 1
            const u = x / (subX - 1)
            const v = y / (subY - 1)
            // Get height value from function and create 3D point
            // Map UV coordinates to X,Z plane (-1 to 1 range) and use height for Y
            positions.push([
                u * 2 - 1, // X: map u from 0->1 to -1->1
                fn([u, v]), // Y: use height value
                v * 2 - 1, // Z: map v from 0->1 to -1->1
            ])
        }
    }

    for (let y = 0; y < subY - 1; y++) {
        for (let x = 0; x < subX - 1; x++) {
            // clockwise order
            // first row
            const a = x + y * subX
            const b = x + 1 + y * subX
            // next row
            const c = x + 1 + (y + 1) * subX
            const d = x + (y + 1) * subX

            triangles.push([a, b, d], [b, c, d])
            quads.push([a, b, c, d])
        }
    }

    return [positions, triangles, quads]
}

const sketch = (context, options = {}) => {
    const { palette = defaultPalette } = options
    const { background, primary, secondary, dark } = palette

    // Change this line to try different parametric functions
    const parametric = rippleSurface

    // number of X and Y subdivision on the surface
    const subdivisions = 32 // increased for smoother surfaces

    const [vertices, triangles, quads] = createGeometry(parametric, subdivisions, subdivisions)

    // you can toggle between rendering triangles and quads
    const renderWidthQuads = true
    const cells = renderWidthQuads ? quads : triangles

    return ({ context, width, height, time }) => {
        context.clearRect(0, 0, width, height)
        context.fillStyle = 'hsl(0, 0%, 95%)'
        context.fillRect(0, 0, width, height)

        context.fillStyle = context.strokeStyle = 'black'

        // Min dimension of screen
        const dim = Math.min(width, height)

        // determine position of camera in 3D space over time
        const curTime = time + 2.5
        const orbitAngle = curTime * 0.05
        const orbitDistance = 1.5
        const u = Math.cos(orbitAngle) * orbitDistance
        const v = Math.sin(orbitAngle) * orbitDistance
        const y = orbitDistance
        const position = [u, y, v]

        // Setup a camera projection function
        const project = createCamera({
            // You can also try using different projection methods
            // mode: "isometric",
            position,
            width,
            height,
        })

        // Project 3D points to 2D screen-space positions
        const vertices2D = vertices.map((v) => project(v))

        // Draw each cell in the mesh
        cells.forEach((cell) => {
            // a cell is a list of indices into our vertex array
            // so we map each index to it corresponding 2D position
            const points = cell.map((i) => vertices2D[i])

            // draw the quad as line segments
            context.beginPath()
            points.forEach((p) => {
                const [x, y] = p
                context.lineTo(x, y)
            })
            context.closePath()
            context.lineJoin = 'round'
            context.lineWidth = dim * 0.0025
            context.stroke()
        })
    }
}

sketch.title = 'Heightfields'
sketch.description = '???'
sketch.animated = true

export { sketch }
