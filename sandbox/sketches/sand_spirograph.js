import { createCanvas } from 'root/canvas'

import { Circle, Line, asPoints } from 'root/geo'

export function sketch(canvas, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette
    const cmd = createCanvas(canvas.width, canvas.height, canvas, [-1, 1])
    cmd.clear(background)

    const circle = new Circle([0, 0], 0.5)
    const count = 64
    const pts = asPoints(circle, count)

    // Create lines connecting every nth point
    const n = count / 2 + 2 // Change this value to connect different points
    const lines = []

    for (let i = 0; i < pts.length; i++) {
        const nextIndex = (i + n) % pts.length
        lines.push(new Line(pts[i], pts[nextIndex]))
    }

    // Draw the lines instead of points
    cmd.draw(lines)
}
