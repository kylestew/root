import { Circle, Line } from 'root/geo'
import { random, randomPoint, weightedRandom } from 'root/random'
import { CircleLinePacking } from 'root/algos'

function circlePacking(cmd, palette) {
    // place any initial obstacles
    const circle1 = new Circle(randomPoint(), 0.5)
    const circle2 = new Circle(randomPoint(), 0.5)
    const line1 = Line.withCenter([0.0, 0.0], random(-Math.PI, Math.PI), 3.0)
    const line2 = Line.withCenter([0.0, 0.0], random(-Math.PI, Math.PI), 3.0)
    const line3 = Line.withCenter([0.0, 0.0], random(-Math.PI, Math.PI), 3.0)
    const line4 = Line.withCenter([0.0, 0.0], random(-Math.PI, Math.PI), 3.0)
    const obstacles = [circle2, circle1, line1, line2, line3, line4]

    // create packer
    const packer = new CircleLinePacking(obstacles)

    // create a random point picking function
    const nextRandomPt = () => {
        // UNIFORM
        return randomPoint([-1, -1], [1, 1])
    }

    // pack a bunch of stuff
    // caller is in charge of picking the shape type, position, min and step size
    const minSize = 0.005
    const maxSize = 1.0
    const stepSize = 0.005
    const tries = 1000
    for (let i = 0; i < tries; i++) {
        const shapeFn = weightedRandom(
            [
                () => {
                    // CIRCLE
                    return new Circle(nextRandomPt(), minSize)
                },
                () => {
                    // LINE
                    return Line.withCenter(nextRandomPt(), random(-Math.PI, Math.PI), minSize)
                },
            ],
            [6.0, 2.0]
        )

        packer.attemptPlacement(shapeFn(), stepSize, maxSize)
    }

    cmd.clear(palette.background)

    cmd.draw(
        packer.packed.filter((obj) => obj instanceof Circle),
        { fill: palette.primary, weight: 0.01 }
    )
    cmd.draw(
        packer.packed.filter((obj) => obj instanceof Line),
        { stroke: palette.secondary, weight: 0.005 }
    )
    cmd.draw(obstacles, { stroke: palette.accent + '99', weight: 0.005 })
}
circlePacking.title = 'Circle Line Packing'
export { circlePacking }
