import { Vec2, Shape, Polygon, Rectangle, Circle, Line, rotate, translate, pointAt } from 'root/geo'
import { gaussian, pickRandom } from 'root/random'
import { degreesToRadians, add, sub } from 'root/math'
import { createCanvas } from '../../dist/canvas'

type Orientation = 0 | 90 | 180 | 270
interface Port {
    pos: Vec2
    type: 'input' | 'output'
}
interface Symbol {
    pos: Vec2
    orientation: Orientation
    size: number

    ports(): Port[]
    toPolys(): Shape[]
}

class Resistor implements Symbol {
    pos: Vec2
    orientation: Orientation
    size: number

    constructor(pos: Vec2, orientation: Orientation, size: number) {
        this.pos = pos
        this.orientation = orientation
        this.size = size
    }

    private place(thing: Shape | Vec2): Shape | Vec2 {
        return translate(rotate(thing, degreesToRadians(this.orientation)), this.pos)
    }

    ports(): Port[] {
        // base positions
        let a = [-this.size / 2, 0] as Vec2
        let b = [this.size / 2, 0] as Vec2

        return [
            { pos: this.place(a) as Vec2, type: 'input' },
            { pos: this.place(b) as Vec2, type: 'output' },
        ]
    }

    toPolys(): Shape[] {
        // size is meant to be how large the entire symbol is
        // the body of the resistor is half the size with leads each being 1/4 the size
        let body: Shape = new Rectangle([0, 0], [this.size / 2.0, this.size / 4.0], { lineJoin: 'round' })

        // lead lines
        const [portA, portB] = this.ports()
        const fullLead = new Line(portA.pos, portB.pos)
        const leadA = new Line(portA.pos, pointAt(fullLead, 0.25))
        const leadB = new Line(pointAt(fullLead, 0.75), portB.pos)

        return [this.place(body) as Shape, leadA, leadB]
    }
}

function makeSymbols(): Shape[] {
    // (1) Place first symbol
    const pos: Vec2 = [gaussian(0, 0.1), gaussian(0, 0.2)]
    const orientation = pickRandom([0, 90, 180, 270])
    const size = 0.4
    const symbol = new Resistor(pos, orientation, size)

    // (2) For each port on symbol, start a current moving away from the symbol
    const ports = symbol.ports().map((port) => {
        return new Circle(port.pos, 0.02, { fill: 'blue' })
    })

    const containerRect = new Rectangle(pos, [size, size], { stroke: 'red', weight: 0.005 })

    // return symbol
    return [...symbol.toPolys(), ...ports, containerRect]
}

export function sketch(canvas, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette
    const cmd = createCanvas(canvas.width, canvas.height, canvas, [-1, 1])
    cmd.clear(background)

    // ADIDAS - all day I dream about symbols
    const polys = makeSymbols()

    cmd.draw(polys)
}
