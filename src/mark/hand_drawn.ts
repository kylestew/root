import { Vec2 } from '../geo/types'

import { Polygon, asPoints, center } from '../geo/index'
import { linspace } from '../array/index'
import { simplex3 } from '../random/noise'
import { chaikinCurve } from '../algos/chaikin'

export function handDrawnCircle(pos: Vec2, r: number, noiseMult = 0.05, noiseScale = 1.0, steps = 8, zStep = 0.0) {
    // choose a random starting rotation
    // const startTheta = random(0, Math.PI * 2.0)
    const startTheta = 0

    return []

    // use noise as the radial offset for each ring position
    // return new Polygon(
    //     chaikinCurve(
    //         asPoints(
    //             center(
    //                 new Polygon(
    //                     linspace(startTheta, startTheta + 2.0 * Math.PI, steps, false).map((theta) => {
    //                         // sample noise at base position
    //                         let x = pos[0] + r * Math.cos(theta)
    //                         let y = pos[1] + r * Math.sin(theta)
    //                         const offsetR = noiseMult * simplex3(noiseScale * x, noiseScale * y, zStep)
    //                         const offsetG = noiseMult * simplex3(noiseScale * x, noiseScale * y, zStep + 1.234)

    //                         // const newR = Math.max(r + offsetR, 0.01)
    //                         // const newR = r + offsetR

    //                         // add offset to position
    //                         // x = pos[0] + newR * Math.cos(theta)
    //                         // y = pos[1] + newR * Math.sin(theta)

    //                         return [x + offsetR, y + offsetG]
    //                     })
    //                 ),
    //                 pos
    //             )
    //         ),
    //         4,
    //         true
    //     )
    // )
}
