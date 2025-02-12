import { Shape, Vec2 } from '../geo/types'
import { pointAt } from '../geo/index'
import { simplex3 } from '../random/index'
import { random } from '../random/index'

class NoiseStroke {
    shape: Shape

    noiseMult: number
    noiseScale: number
    noiseWalk: number
    minStep: number
    deviation: number

    phase: number

    constructor(
        shape: Shape,
        noiseMult: number = 0.05,
        noiseScale: number = 2.0,
        noiseWalk: number = 0.2,
        minStep: number = 0.001,
        deviation: number = 0.5
    ) {
        this.shape = shape
        this.noiseMult = noiseMult
        this.noiseScale = noiseScale
        this.noiseWalk = noiseWalk
        this.minStep = minStep

        this.deviation = deviation

        this.phase = 0
    }

    /// one pass over the length of the stroke
    onePass(): Vec2[] {
        this.phase += this.noiseWalk

        const points: Vec2[] = []
        let safety = 10000
        let t = 0.0
        let [px, py] = pointAt(this.shape, t)
        let done = false
        while (t <= 1 && !done) {
            let density = Math.abs(this.noiseMult * simplex3(this.noiseScale * px, this.noiseScale * py, this.phase))
            t += density + this.minStep
            if (t > 1) {
                t -= 1
                done = true
            }

            // sample the shape at t
            const [x, y] = pointAt(this.shape, t)

            // const r = Math.abs(random(-this.deviation * density, this.deviation * density))
            const r = Math.abs(random(-this.deviation, this.deviation))
            const theta = Math.random() * Math.PI * 2 // Random angle
            const offsetX = r * Math.cos(theta)
            const offsetY = r * Math.sin(theta)

            points.push([x + offsetX, y + offsetY])

            px = x
            py = y

            if (safety-- < 0) {
                console.log('safety')
                break
            }
        }

        return points
    }

    manyPasses(count = 100): Vec2[] {
        const points: Vec2[] = []
        for (let i = 0; i < count; i++) {
            points.push(...this.onePass())
        }
        return points
    }
}

export function sand(
    shape: Shape,
    noiseMult: number = 0.05,
    noiseScale: number = 2.0,
    noiseWalk: number = 0.2,
    minStep: number = 0.001,
    deviation: number = 0.5,
    passes: number = 100
) {
    const stroke = new NoiseStroke(shape, noiseMult, noiseScale, noiseWalk, minStep, deviation)
    return stroke.manyPasses(passes)
}
