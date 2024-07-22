import { Circle, Polygon, scatter } from 'root/geo'
import { convexHull } from 'root/algos'

function convexHullDemo(cmd, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette

    const circ = new Circle([0, 0], 0.75)

    cmd.clear(background)

    const pts = scatter(circ, 64)

    const hullPts = convexHull(pts)
    const poly = new Polygon(hullPts)

    cmd.draw(circ, { stroke: secondary + '66', weight: 0.01 })
    cmd.draw(poly, { fill: primary })
    cmd.draw(pts, { fill: accent })
}
convexHullDemo.title = 'Convex Hull'
export { convexHullDemo }
