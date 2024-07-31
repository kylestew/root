import { Grid, offset } from 'root/geo'

function findLargestSquareCellSize(width, height, delta = 0.01) {
    const minDimension = Math.min(width, height)
    const maxDimension = Math.max(width, height)
    let cellSize = minDimension

    while (cellSize > 0) {
        const cellsWidth = Math.floor(width / cellSize)
        const cellsHeight = Math.floor(height / cellSize)

        const totalWidth = cellsWidth * cellSize
        const totalHeight = cellsHeight * cellSize

        const widthDiffPercentage = Math.abs(width - totalWidth) / width
        const heightDiffPercentage = Math.abs(height - totalHeight) / height

        if (widthDiffPercentage <= delta && heightDiffPercentage <= delta) {
            return cellSize
        }

        cellSize -= 0.001 // Decrease the cell size slightly and check again
    }

    throw new Error('No suitable cell size found')
    return 0 // Return 0 if no suitable cell size found
}

export function gridStudies(cmd, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette

    cmd.clear(dark)

    // center in rect to draw grid inside
    const rect = offset(cmd.range.rect, [-0.2, -0.1])

    // given the rect size, determine a square-ish cell size
    let cellSize = findLargestSquareCellSize(rect.size[0], rect.size[1])

    // divide down until below a certain threshold
    while (cellSize > 0.12) {
        cellSize /= 2
    }
    const rows = Math.floor(rect.size[1] / cellSize)
    const cols = Math.floor(rect.size[0] / cellSize)

    // create grid using rect as template
    const grid = Grid.withRect(rect, rows, cols)

    // draw cells in the grid
    grid.rects().forEach((rect) => {
        const cell = offset(rect, -0.004)
        cmd.draw(cell, { fill: background })
    })

    // TODO: do this in ROOT under /text
    const ctx = cmd.ctx
    ctx.save()
    // ctx.translate(0.03, 0.8)
    // ctx.rotate(Math.PI / 2)
    ctx.scale(1, -1) // upside down?
    ctx.font = '0.1px Monaco'
    ctx.fillStyle = background
    // ctx.fillStyle = col.luminance() > 128 ? 'black' : 'white'
    // ctx.fillText(col.toHex(), 0, 0)
    // ctx.fillText(colorNames[index], 1.0, 0)
    ctx.fillText('hello world', rect.pos[0], rect.pos[1] - 0.01)
    ctx.restore()
}
