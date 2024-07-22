import { Rectangle, Line, Arc, Polyline } from '../tools/geo'
import { asPoints, asPath, translate, scale } from '../tools/geo/ops'
import { splitArray, zip } from '../tools/array'
import { add, dist } from '../tools/math/vectors'
import { midPt } from '../tools/math'
import { neg } from '../tools/math/vectors'
import { chaikinCurve } from '../tools/algos/chaikin'
import { simplex3 } from '../tools/random/noise'
import { draw } from '../tools/draw'

export function woodBlocks(ctx, palette) {
    const { background, primary, secondary, accent, dark, neutral } = palette

    function createWoodBlock(zOffset) {
        // (1) create a line across the entire canvas
        const line = new Line([-2.0, 0], [2.0, 0])

        // (2) split the line into two equal list of points and join them with arcs
        const arcCount = 300
        const [ptsA, ptsB] = splitArray(asPoints(line, arcCount), arcCount / 2)
        const basePointsA = ptsA.reverse().slice(5)
        const basePointsB = ptsB.slice(5)
        const arcs = zip(basePointsA, basePointsB).map(([a, b]) => {
            const mid = midPt(a, b)
            const rad = dist(mid, a)
            return new Arc(mid, rad, 0, Math.PI, false)
        })

        // (3) convert arcs to points evenly spaced
        let arcPoints = arcs.map((arc) => {
            const ptCount = Math.floor(arc.arcLength() * 30)
            return asPoints(arc, ptCount)
        })

        // (4) flow points through a field
        const noiseStrength = 0.01
        const noiseMult = 14.0
        const noiseZ = Date.now() + zOffset
        const dampingFactor = 15.0 // Adjust this factor to control the damping effect
        arcPoints = arcPoints.map((pts) =>
            pts.map((pt) => {
                // Calculate the damping based on the y-coordinate
                const yDamping = 1.0 - Math.max(0, 1 - dampingFactor * Math.abs(pt[1]))

                // Apply the noise with damping
                return add(pt, [
                    noiseStrength * yDamping * simplex3(noiseMult * pt[0], noiseMult * pt[1], 0.1 + noiseZ),
                    noiseStrength * yDamping * simplex3(noiseMult * pt[0], noiseMult * pt[1], 0.9123 + noiseZ),
                ])
            })
        )

        // (5) convert points back to polylines
        const polylines = arcPoints.map((pts) => new Polyline(chaikinCurve(pts, 3)))

        return polylines
    }

    const clipRectSize = [1.4, 0.7]
    const rectSeperation = [-0.06, 0.06]

    // BLOCK A
    let blockA = createWoodBlock(0.0)
    blockA = blockA.map((polyline) => translate(polyline, [0.35, -0.45]))
    // clip to rect
    const clipA = Rectangle.withCenter(neg(rectSeperation), clipRectSize)
    ctx.save()
    ctx.clip(asPath(clipA))
    draw(ctx, blockA, { stroke: primary + 'AA', weight: 0.003 })
    ctx.restore()

    // BLOCK B
    let blockB = createWoodBlock(0.12345)
    blockB = blockB.map((polyline) => scale(translate(polyline, [-0.35, -0.45]), [1, -1]))
    // clip to rect
    const clipB = Rectangle.withCenter(rectSeperation, clipRectSize)
    ctx.save()
    ctx.clip(asPath(clipB))
    draw(ctx, blockB, { stroke: secondary + 'AA', weight: 0.003 })
    ctx.restore()

    draw(ctx, clipA, { stroke: accent + 'AA', weight: 0.004 })
    draw(ctx, clipB, { stroke: accent + 'AA', weight: 0.004 })

    // // (6) clip the polylines with a rectangle before drawing

    // // connect lines off into infinity
    // const infinityPt = () => add([Math.random() * 0.005, Math.random() * 0.005], [0.28, -0.8])
    // const isInsideClipRect = (pt) => pt[0] >= -0.8 && pt[0] <= 0.8 && pt[1] >= 0 && pt[1] <= 0.8
    // basePointsA
    //     .concat(basePointsB)
    //     .filter(isInsideClipRect)
    //     .forEach((pt) => {
    //         draw(ctx, new Line(pt, infinityPt()), { stroke: primary + '99', weight: 0.004 })
    //     })
}
