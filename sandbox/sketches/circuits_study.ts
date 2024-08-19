import { Vec2, Grid, Rectangle } from 'root/geo'

// scatter symbols on a grid
// connect with wires as best as possible

// Line (wire)
// convert line to resistor or capacitor

class Resistor {
    // position
    // orientation
    // size
    constructor(pos: Vec2, orientation: number) {}

    asPolygon() {}
}

export function sketch(cmd, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette

    cmd.clear(background)

    // center in rect to draw grid inside
    // const rect = offset(cmd.range.rect, [-0.2, -0.1])

    const rect = new Rectangle([0, 0], [1.6, 2.4])
    cmd.draw(rect, { stroke: primary, weight: 0.01 })
}
