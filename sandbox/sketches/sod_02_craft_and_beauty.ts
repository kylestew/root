import { Circle, Ellipse, Rectangle, asPath, rotate } from 'root/geo'
import { linspace } from 'root/array'
import { createCanvas } from 'root/canvas'

export function sketch(canvas, palette) {
    const { background, primary, secondary, dark } = palette

    const cmd = createCanvas(canvas.width, canvas.height, canvas)
    cmd.clear(background)

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
    cmd.draw(circ, { fill: secondary, stroke: dark, weight: 0.05 })

    // draw bottom half of ellipses
    const bottomRect = new Rectangle([0, -0.5], [2, 1])
    cmd.ctx.save()
    cmd.ctx.clip(asPath(bottomRect))
    drawEllipses()
    cmd.ctx.restore()
}
