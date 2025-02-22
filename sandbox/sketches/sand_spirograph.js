import { createCanvas } from 'root/canvas'
import { Circle, Line, asPoints } from 'root/geo'
import { fuzz, sand } from 'root/mark'

const sketch = (context, options = {}) => {
    const { palette = defaultPalette } = options
    const { background, primary, secondary, accent, dark, neutral } = palette

    // Create canvas command object once
    const cmd = createCanvas(context.canvas.width, context.canvas.height, context.canvas, [-1, 1])

    return ({ width, height, time }) => {
        cmd.setRange([-1, 1]) // reset range - seems to get messed up
        cmd.clear(background)

        // Create two circles offset vertically
        const circle1 = new Circle([0, 0.65], 0.95) // Upper circle
        const circle2 = new Circle([0, -0.64], 0.95) // Lower circle
        const count = 208
        const pts1 = asPoints(circle1, count)
        const pts2 = asPoints(circle2, count)

        // Create lines connecting every nth point for both circles
        const n = count / 2
        const lines1 = []
        const lines2 = []

        // Add lines for first circle
        for (let i = 0; i < pts1.length; i++) {
            const nextIndex = (i + n) % pts1.length
            lines1.push(new Line(pts1[i], pts1[nextIndex]))
        }

        // Add lines for second circle
        for (let i = 0; i < pts2.length; i++) {
            const nextIndex = (i + n) % pts2.length
            lines2.push(new Line(pts2[i], pts2[nextIndex]))
        }

        // Draw first set of lines with sand effect
        for (const line of lines1) {
            const grains = sand(line, 0.005, 3.7, 0.02, 0.002, 0.007, 48)
            cmd.draw(grains, { fill: primary + '09', weight: 0.002 })
        }

        // Draw second set of lines with sand effect
        for (const line of lines2) {
            const grains = sand(line, 0.005, 3.7, 0.02, 0.002, 0.007, 48)
            cmd.draw(grains, { fill: dark + '09', weight: 0.002 })
        }
    }
}

// Add metadata properties
sketch.title = 'Sand Spirograph'
sketch.description = 'Spirograph pattern with sand-like texture'
sketch.animated = false

export { sketch }
