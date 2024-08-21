import { Vec2, Shape, Polygon, Rectangle, Circle, Line, rotate, translate, pointAt } from 'root/geo'
import { gaussian, pickRandom, random } from 'root/random'
import { add, sub, mulN, normalize, mul } from 'root/math'
import { createCanvas } from '../../dist/canvas'

const GRID_SIZE = 0.2

interface Port {
    parent: Symbol
    connectedTo?: Port
    pos: Vec2
    normal: Vec2
}
interface Symbol {
    ports: Port[]
    // symbols are in charge of drawing themselves between ports
    toPolys(): Shape[]
}

class Resistor implements Symbol {
    ports: Port[]

    constructor(portPositions: Vec2[]) {
        // we have port positions, so we can determine the rest
        // give the ports normals facing away from eachother
        const [posA, posB] = portPositions

        const normalA = normalize(sub(posA, posB)) as Vec2
        const normalB = normalize(sub(posB, posA)) as Vec2

        this.ports = [
            { pos: posA, normal: normalA, parent: this },
            { pos: posB, normal: normalB, parent: this },
        ]
    }

    toPolys(): Shape[] {
        // given the port positions, draw a resistor between them
        const [portA, portB] = this.ports
        const portAxis = new Line(portA.pos, portB.pos)

        // lead lines
        const leadA = new Line(portA.pos, pointAt(portAxis, 0.25))
        const leadB = new Line(pointAt(portAxis, 0.75), portB.pos)

        const tempCircle = new Circle(pointAt(portAxis, 0.5), 0.05, { stroke: 'black', weight: 0.01 })
        // do a Zig Zag pattern!

        //     // resistor body
        // // a polygon with the portAxis as the center line
        // const midPoint = portAxis.midpoint();
        // const direction = portAxis.direction().perpendicular();
        // const length = portAxis.length() * 0.5; // Adjust the length as needed
        // const zigzagHeight = length * 0.1; // Zigzag height relative to length

        // // Create a zigzag pattern
        // const numZigzags = 6;
        // const step = length / (numZigzags * 2);
        // let points = [];

        // for (let i = 0; i <= numZigzags; i++) {
        //     const t = i / numZigzags;
        //     const p = pointAt(portAxis, 0.25 + t * 0.5);
        //     const offset = (i % 2 === 0 ? 1 : -1) * zigzagHeight;
        //     const zigzagPoint = p.add(direction.scale(offset));
        //     points.push(zigzagPoint);
        // }

        // Create a polygon for the resistor body
        // const resistorBody = new Polygon(points);

        return [leadA, leadB, tempCircle]
    }
}

// class Wire implements Symbol {
//     static createWire(inPort: Port, targetPosition: Vec2, targetSize: number): Wire {}

//     pos: Vec2
//     orientation: Orientation
//     size: number

//     constructor(pos: Vec2, orientation: Orientation, size: number) {
//         this.pos = pos
//         this.size = size
//     }
// }

function randomSymbolFrom(portOrPos: Port | Vec2): Symbol {
    // given an incoming port or position,
    // create a random symbol with a target out port position as well

    // RESISTOR: 2 ports on opposite sides
    if (Array.isArray(portOrPos)) {
        // choose any orientation
        const posA = portOrPos as Vec2
        const angle = pickRandom([0, 1.0 / 2.0, 1.0, 3.0 / 2.0]) * Math.PI
        const posB = rotate([posA[0] + GRID_SIZE, posA[1]], angle) as Vec2
        return new Resistor([posA, posB])
    } else {
        // if you want to rotate, you have to do it around the incoming port's normal
        // being careful not to point backwards
        // also: attach the port before returning
        const posA = portOrPos.pos
        const normA = portOrPos.normal
        const posB = add(posA, mulN(normA, GRID_SIZE)) as Vec2
        const symbol = new Resistor([posA, posB])
        symbol.ports[0].connectedTo = portOrPos

        return symbol
    }

    // TODO: connect wires

    // const isSymbol = !(rootSymbol instanceof Wire)
    // const isSymbol = true

    //     //     // if a symbol, connect at least on wire to it
    //     //     if (isSymbol) {
    //     //         // connect wire
    //     //         return Wire.createWire(port, pos, GRID_SIZE)
    //     //     } else {
    //     //         // throw for symbol type
    //     //         console.error('no symbols yet')
    //     //     }

    // if close enough, auto connect symbol using smart wires
    // wires are glue, they can have their ports placed to gap offset sections of grid
}

function makeSymbols(): Symbol[] {
    // (1) Determine anchor port position
    // const pos: Vec2 = [gaussian(0, 0.1), gaussian(0, 0.2)]
    const pos: Vec2 = [0, 0]

    // (2) Create root symbol from port positions but don't attach ports
    const rootSymbol = randomSymbolFrom(pos)
    console.log(rootSymbol)

    // (3) Grow symbols and wires recursively outwards from root symbol
    const symbols = rootSymbol.ports
        .filter((port) => port.connectedTo === undefined)
        .map((port) => {
            return randomSymbolFrom(port)
        })
    return [rootSymbol, ...symbols]
    // TODO: go recursive
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

        const ports = symbol.ports.map((port) => {
            return new Circle(port.pos, 0.015, { fill: 'blue' })
        })
        cmd.draw(ports)

        const normals = symbol.ports.map((port) => {
            const bob = add(port.pos, mulN(port.normal, 0.1))
            return new Line(port.pos, bob, { stroke: 'green', weight: 0.008 })
        })
        cmd.draw(normals)
    })
}
