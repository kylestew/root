import { Grid, offset } from 'root/geo'
import { uniform2D, gaussian2D } from 'root/random'
import { map01toRect } from 'root/math'
import { linear, easeInOutSine, easeInSine, easeOutBounce } from 'root/math'

function easingsDistros(cmd, palette) {
    let { background, primary, secondary, accent, dark, neutral } = palette

    cmd.clear(background)

    const grid = new Grid([-1, -1], [2, 2], 2, 2)
    const rects = grid.rects().map((r) => offset(r, -0.02))

    const sampleCount = 25000
    const color = primary + 'AA'

    function applyEasings(easeX, easeY) {
        return function (pt) {
            return [easeX(pt[0]), easeY(pt[1])]
        }
    }

    // 1) uniform: [easeInSine, _]
    let pts = uniform2D(sampleCount).map(applyEasings(easeInOutSine, linear))
    cmd.draw(map01toRect(pts, rects[0], true), { fill: color, weight: 0.002 })

    // 2) uniform: [easeInSine, _]
    pts = uniform2D(sampleCount).map(applyEasings(easeInOutSine, linear))
    cmd.draw(map01toRect(pts, rects[1], true), { fill: color, weight: 0.002 })

    // 3) gaussian: [easeInSine, _]
    pts = gaussian2D(sampleCount, [0.5, 0.5], [0.2, 0.2]).map(applyEasings(easeInSine, linear))
    cmd.draw(map01toRect(pts, rects[2], true), { fill: color, weight: 0.002 })

    // 4) ???
    pts = uniform2D(sampleCount).map(applyEasings(easeOutBounce, linear))
    cmd.draw(map01toRect(pts, rects[3], true), { fill: color, weight: 0.002 })
}

easingsDistros.title = 'Easings Distributions'
export { easingsDistros }
