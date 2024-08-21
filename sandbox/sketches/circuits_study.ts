import { Vec2, Shape, Polygon, Rectangle, Circle, Line, rotate, translate, pointAt } from 'root/geo'
import { gaussian, pickRandom } from 'root/random'
import { add, sub, mulN, normalize, degreesToRadians, mul } from 'root/math'
import { createCanvas } from '../../dist/canvas'

const GRID_SIZE = 0.2

type Orientation = 0 | 90 | 180 | 270
interface Port {
    pos: Vec2
    type: 'input' | 'output'
    normal: Vec2
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

        const nA = rotate(normalize(a) as Vec2, degreesToRadians(this.orientation)) as Vec2
        const nB = rotate(normalize(b) as Vec2, degreesToRadians(this.orientation)) as Vec2

        return [
            { pos: this.place(a) as Vec2, type: 'input', normal: nA },
            { pos: this.place(b) as Vec2, type: 'output', normal: nB },
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

class Wire implements Symbol {}

function placeSymbol(pos: Vec2): Symbol {
    // TODO: randomly pick one symbol type
    const orientation = pickRandom([0, 90, 180, 270])
    const symbol = new Resistor(pos, orientation, GRID_SIZE)
    return symbol
}

function makeSymbols(): Symbol[] {
    // (1) Place first symbol
    // const pos: Vec2 = [gaussian(0, 0.1), gaussian(0, 0.2)]
    const pos: Vec2 = [0, 0]
    const rootSymbol = placeSymbol(pos)

    // (2) For each port on symbol, start a current moving away from the symbol
    // what grid position is the next symbol in?
    // just need a pos vec2
    rootSymbol.ports().forEach((port) => {
        const pos = add(port.pos, mulN(port.normal, GRID_SIZE / 2.0))
        const rect = new Rectangle(pos, [GRID_SIZE, GRID_SIZE], { stroke: 'purple', weight: 0.005 })
        cmd.draw(rect)
    })
    // TODO: fill a symbol in the purple rect

    return [rootSymbol]
}

let cmd // for easy visual debug
export function sketch(canvas, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette
    cmd = createCanvas(canvas.width, canvas.height, canvas, [-1, 1])
    cmd.clear(background)

    // ADIDAS - all day I dream about symbols
    const symbols = makeSymbols()

    // draw symbols
    symbols.forEach((symbol) => {
        // DEBUG: container, port point and normals
        cmd.draw(symbol.toPolys())
        const containerRect = new Rectangle(symbol.pos, [symbol.size, symbol.size], { stroke: 'red', weight: 0.005 })
        cmd.draw(containerRect)
        const ports = symbol.ports().map((port) => {
            return new Circle(port.pos, 0.015, { fill: 'blue' })
        })
        cmd.draw(ports)
        const normals = symbol.ports().map((port) => {
            const bob = add(port.pos, mulN(port.normal, 0.1))
            return new Line(port.pos, bob, { stroke: 'green', weight: 0.008 })
        })
        cmd.draw(normals)
    })
}
