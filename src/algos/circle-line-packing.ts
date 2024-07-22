import { Shape } from '../geo/types'
import { Circle, Line, intersects } from '../geo/index'

export class CircleLinePacking {
    obstacles: (Circle | Line)[]
    packed: (Circle | Line)[]

    constructor(obstacles: (Circle | Line)[] = []) {
        this.obstacles = obstacles
        this.packed = []
    }

    attemptPlacement(shape: Circle | Line, stepSize: number, maxSize: number) {
        let targetShape = shape
        let placedShape: Circle | Line | undefined = undefined
        while ([...this.obstacles, ...this.packed].every((otherShape) => !intersects(targetShape, otherShape))) {
            placedShape = targetShape

            if (targetShape instanceof Circle) {
                if (targetShape.r >= maxSize) {
                    break
                }
                targetShape = new Circle(targetShape.pos, targetShape.r + stepSize)
            } else if (targetShape instanceof Line) {
                const length = targetShape.length
                if (length >= maxSize) {
                    break
                }
                // make a new line with the same angle and center point but extended by stepSize
                targetShape = Line.withCenter(targetShape.centerPt, targetShape.angle, length + stepSize)
            }
        }
        if (placedShape !== undefined) {
            this.packed.push(placedShape)
            return placedShape
        }
        return undefined
    }
}
