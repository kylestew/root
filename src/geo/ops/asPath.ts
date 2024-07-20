import { Shape } from '../types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle, Quadratic } from '../index'
// Adjust the import statement to match your project structure
// and ensure that all types are correctly imported

/**
 * Converts a geometric object to a Path2D object.
 *
 * @param shape - The geometric shape to convert
 *
 * @returns {Path2D} - The converted Path2D object.
 * @throws {Error} - If the conversion method is not implemented for the given geometric object.
 */
export function asPath(shape: Shape): Path2D {
    if (Array.isArray(shape)) {
        let paths = new Path2D()
        for (let element of shape) {
            paths.addPath(asPath(element))
        }
        return paths
    }

    let path = new Path2D()
    if (shape instanceof Arc) {
        const arc = shape as Arc
        const [x, y] = arc.pos
        path.arc(x, y, arc.r, arc.start, arc.end, arc.clockwise)
    } else if (shape instanceof Circle) {
        const circle = shape as Circle
        const [x, y] = circle.pos
        path.arc(x, y, circle.r, 0, Math.PI * 2)
    } else if (shape instanceof Ellipse) {
        const ellipse = shape as Ellipse
        const [x, y] = ellipse.pos
        const [radX, radY] = ellipse.r
        path.ellipse(x, y, radX, radY, 0, 0, 2.0 * Math.PI)
    } else if (shape instanceof Polyline) {
        const polyline = shape as Polyline
        polyline.pts.forEach((pt, idx) => {
            let x: number, y: number
            if (Array.isArray(pt)) {
                ;[x, y] = pt
            } else {
                ;({ x, y } = pt)
            }
            if (idx === 0) {
                path.moveTo(x, y)
            } else {
                path.lineTo(x, y)
            }
        })
    } else if (shape instanceof Line) {
        const line = shape as Line
        path.moveTo(line.pts[0][0], line.pts[0][1])
        path.lineTo(line.pts[1][0], line.pts[1][1])
    } else if (shape instanceof Polygon) {
        const polygon = shape as Polygon
        polygon.pts.forEach((pt, idx) => {
            const [x, y] = pt
            if (idx === 0) {
                path.moveTo(x, y)
            } else {
                path.lineTo(x, y)
            }
        })
        path.closePath()
    } else if (shape instanceof Quadratic) {
        const quadratic = shape as Quadratic
        const [start, ctrl, dest] = quadratic.pts
        path.moveTo(start[0], start[1])
        path.quadraticCurveTo(ctrl[0], ctrl[1], dest[0], dest[1])
    } else if (shape instanceof Rectangle) {
        const rectangle = shape as Rectangle
        path.rect(rectangle.pos[0], rectangle.pos[1], rectangle.size[0], rectangle.size[1])
    }

    return path
}
