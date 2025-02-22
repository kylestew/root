import createCamera from './lib/createCamera.js'

const sketch = (palette) => {
    const { background, primary, secondary } = palette

    const vertices = [
        [-0.5, 0, -0.5],
        [0.5, 0, -0.5],
        [0.5, 0, 0.5],
        [-0.5, 0, 0.5],
    ]

    return ({ context, width, height, time }) => {
        context.clearRect(0, 0, width, height)
        context.fillStyle = background
        context.fillRect(0, 0, width, height)

        context.fillStyle = context.strokeStyle = primary

        // Min dimension of screen
        const dim = Math.min(width, height)

        // determine position of camera in 3D space over time
        const curTime = time + 2.5
        const orbitAngle = curTime * 0.5
        const orbitDistance = 1
        const u = Math.cos(orbitAngle) * orbitDistance
        const v = Math.sin(orbitAngle) * orbitDistance
        const y = Math.sin(curTime) * orbitDistance * 2
        const position = [u, y, v]

        // Setup a camera projection function
        const project = createCamera({
            // You can also try using different projection methods
            // mode: "isometric",
            position,
            width,
            height,
        })

        // Project 3D point to 2D screen-space positions
        const points2D = vertices.map((v) => project(v))

        // connect points to form a 3D square
        context.beginPath()
        points2D.forEach((p) => {
            const [x, y] = p
            context.lineTo(x, y)
        })
        context.closePath()
        context.stroke()

        // draw each point as a circle
        context.fillStyle = context.strokeStyle = secondary
        points2D.forEach((p) => {
            const [x, y] = p
            context.beginPath()
            context.arc(x, y, dim * 0.01, 0, Math.PI * 2)
            context.fill()
        })
    }
}

sketch.title = 'Projection'
sketch.description = 'Projecting 3D points to 2D screen-space positions'
sketch.animated = true

export { sketch }
