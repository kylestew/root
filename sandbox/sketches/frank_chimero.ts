import { Line, Vec2 } from 'root/geo'
import { taperedLine } from 'root/mark'

export function shapeOfDesign(cmd) {
    const background = '#f5f5f5'
    const primary = '#b95b23'
    const secondary = '#000000'
    const text = '#333333'

    cmd.clear(background)

    const lineStart: Vec2 = [-0.8, -1]
    const lineEnd: Vec2 = [0.8, 1]

    const line = new Line(lineStart, lineEnd)
    const tapered = taperedLine(line, [0.005, 0.02])
    cmd.draw(tapered, { stroke: primary, lineCap: 'round' })
}
