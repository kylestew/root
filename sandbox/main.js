import { createCanvas } from 'root/canvas'
import { Grid, Circle, offset, withAttribs } from 'root/geo'

const cmd = createCanvas(1200, 1400)
const { rect } = cmd.setRange(-1, 1)

const palette = {
    background: '#d7d3c7',
    white: '#dad9d7',
}
const colors = ['#0c2d5b', '#ddad26', '#c75b16', '#ddad26', '#0c2d5b']

// circles pattern found experimentally
function circlesMaskPattern() {
    let circles = []
    const colSpace = 0.285
    const rowSpace = 0.08
    for (let row = 0; row < 28; row++) {
        const flipped = row % 2 ? 0 : colSpace / 2
        for (let col = 0; col < 9; col++) {
            const x = -1 + colSpace * col + flipped
            const y = -0.04 + -1 + rowSpace * row
            const center = [x, y]
            const radius = 0.075
            const circle = new Circle(center, radius)
            circles.push(circle)
        }
    }
    return circles
}

cmd.clear(palette.background)

// draw background rect
cmd.draw(offset(rect, -0.2), { fill: palette.white })

// draw colored strips over top
const innerRect = offset(rect, -0.3)
const grid = new Grid(innerRect.pos, innerRect.size, 1, 5)
const strips = grid.cells().map(({ index, rect }) => {
    return withAttribs(rect, { fill: colors[index % colors.length] })
})
cmd.draw(strips)

// "cut out" the circles by drawing them with the background color
cmd.draw(circlesMaskPattern(), { fill: palette.background })
