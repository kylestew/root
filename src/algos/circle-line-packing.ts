import { Shape } from '../geo/types'
import { Circle, Line, intersects } from '../geo/index'

export class CircleLinePacking {
    obstacles: (Circle | Line)[]
    packed: (Circle | Line)[]

    constructor(obstacles: (Circle | Line)[] = []) {
        this.obstacles = obstacles
        this.packed = []
    }

    /**
     * Attempts to place a shape (either a Circle or a Line) within the packing area.
     * The circle packer will not increase the size of the shape if `stepSize` is undefined.
     *
     * @param shape - The shape (Circle or Line) to be placed.
     * @param stepSize - The size of the step to be taken when extending the shape.
     * @param maxSize - The maximum size allowed for the shape.
     *
     * @returns The placed shape (Circle or Line) if successful, otherwise undefined.
     */
    attemptPlacement(shape: Circle | Line, stepSize?: number, maxSize?: number): Circle | Line | undefined {
        maxSize = maxSize ?? 0

        let targetShape = shape
        let placedShape: Circle | Line | undefined = undefined
        while ([...this.obstacles, ...this.packed].every((otherShape) => !intersects(targetShape, otherShape))) {
            placedShape = targetShape

            if (stepSize === undefined) {
                // if stepSize is undefined, we don't want to increase the size of the shape
                break
            }

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
