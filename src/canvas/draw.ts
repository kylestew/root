import { GeoData, Vec2, Pt, Attribs } from '../geo/types'
import { Arc, Circle, Ellipse, Line, Polygon, Polyline, Rectangle, Quadratic, Grid } from '../geo/index'
import { asPath } from '../geo/index'

function isPt(obj: any): obj is Pt {
    return typeof obj.x === 'number' && typeof obj.y === 'number'
}
function isVec2(obj: any): obj is Vec2 {
    return obj.length === 2 && typeof obj[0] === 'number' && typeof obj[1] === 'number'
}

export function draw(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    geo: GeoData,
    attribs: Attribs = {}
) {
    // if an array, run draw on each element
    if (Array.isArray(geo)) {
        // check if its a Vec2 first
        if (isVec2(geo)) {
            const rad = attribs.weight || 0.01
            ctx.strokeStyle = attribs.stroke || 'black'
            draw(ctx, new Circle(geo, rad), attribs)
            return
        }

        // else draw each sub-element
        geo.forEach((g) => draw(ctx, g, attribs))
        return
    } else if (geo instanceof Grid) {
        geo.rects().forEach((rect) => draw(ctx, rect, attribs))
        return
    } else if (isPt(geo)) {
        // treat as Vec2 object
        return draw(ctx, [geo.x, geo.y], attribs)
    }

    ctx.save()

    // clear styles
    ctx.fillStyle = 'none'
    ctx.strokeStyle = 'none'

    // apply styles from drawing attribs
    let hasStroke = false
    let hasFill = false
    if (attribs.fill && attribs.fill !== 'none') {
        ctx.fillStyle = attribs.fill
        hasFill = true
    }
    if (attribs.stroke) {
        ctx.strokeStyle = attribs.stroke
        hasStroke = true
    }
    if (attribs.weight) {
        ctx.lineWidth = attribs.weight
    }
    if (attribs.lineCap) {
        ctx.lineCap = attribs.lineCap
    }
    if (attribs.lineJoin) {
        ctx.lineJoin = attribs.lineJoin
    }
    if (attribs.lineDash) {
        ctx.setLineDash(attribs.lineDash)
    }

    // else, needs to be a shape to draw
    if (
        !(
            geo instanceof Arc ||
            geo instanceof Circle ||
            geo instanceof Ellipse ||
            geo instanceof Line ||
            geo instanceof Polygon ||
            geo instanceof Polyline ||
            geo instanceof Rectangle ||
            geo instanceof Quadratic
        )
    ) {
        ctx.restore()
        return
    }

    // apply styles from geo attribs (they override)
    if (geo.attribs !== undefined) {
        if (geo.attribs.fill && geo.attribs.fill !== 'none') {
            ctx.fillStyle = geo.attribs.fill
            hasFill = true
        }
        if (geo.attribs.stroke) {
            ctx.strokeStyle = geo.attribs.stroke
            hasStroke = true
        }
        if (geo.attribs.weight) {
            ctx.lineWidth = geo.attribs.weight
        }
        if (geo.attribs.lineCap) {
            ctx.lineCap = geo.attribs.lineCap
        }
        if (geo.attribs.lineJoin) {
            ctx.lineJoin = geo.attribs.lineJoin
        }
        if (geo.attribs.lineDash) {
            ctx.setLineDash(geo.attribs.lineDash)
        }
    }

    // perform drawing
    if (hasFill) {
        ctx.fill(asPath(geo))
    }
    if (hasStroke) {
        ctx.stroke(asPath(geo))
    }
    if (!(hasFill || hasStroke)) {
        // default for debug
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 0.01
        ctx.stroke(asPath(geo))
    }

    ctx.restore()
}

export function clear(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, clearColor: string) {
    // Save the current transformation matrix
    ctx.save()
    // Reset the transformation matrix to the default state
    ctx.resetTransform()
    // Set the fill style to the clear color
    ctx.fillStyle = clearColor
    // Clear the canvas with the given color
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // Restore the previous transformation matrix
    ctx.restore()
}
