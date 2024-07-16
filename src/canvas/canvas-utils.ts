import { GeoData, Attribs } from '../geo/types'
import { draw, clear } from '../draw/index'

// import { installSaveCanvasCommand } from './canvas-save'
// import { installValuesCheck } from './values-check'

interface CanvasRangeInfo {
    xRange: [number, number]
    yRange: [number, number]
}

interface CanvasCommands {
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    setRange: (min: number, max: number) => CanvasRangeInfo
    clear: (clearColor: string) => void
    draw: (geo: GeoData, attribs: Attribs) => void
}

/**
 * Creates a canvas element with the specified width and height, and returns its rendering context.
 * If a canvas ID is not provided, the default ID 'mainCanvas' is used.
 *
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 * @param existingCanvas - Canvas HTML element to bind to (creates one if not provided).
 *
 * @returns The rendering context of the created canvas.
 * @throws {Error} If canvas is not supported in the browser.
 */
export function createCanvas(width: number, height: number, existingCanvas: HTMLCanvasElement): CanvasCommands {
    // setup or bind to existing canvas
    let canvas = existingCanvas
    if (!canvas) {
        // Create a new canvas element if it doesn't exist
        const newCanvas = document.createElement('canvas')
        // newCanvas.id = canvasId
        document.body.appendChild(newCanvas)
        canvas = newCanvas
    }
    canvas.width = width
    canvas.height = height

    // get canvas context
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) {
        throw new Error('Canvas not supported in this browser!')
    }

    return {
        ctx,
        setRange: (min: number, max: number) => setCanvasRange(ctx, min, max),
        clear: (clearColor: string) => clear(ctx, clearColor),
        draw: (geo: GeoData, attribs: Attribs) => draw(ctx, geo, attribs),
    }
}

// /**
//  * Creates an offscreen canvas with the specified width and height.
//  *
//  * @param width - The width of the offscreen canvas.
//  * @param height - The height of the offscreen canvas.
//  * @param clearColor - The color used to clear the offscreen canvas. Defaults to 'black'.
//  *
//  * @returns The OffscreenCanvasRenderingContext2D object representing the offscreen canvas.
//  * @throws Error if the OffscreenCanvasRenderingContext2D cannot be created.
//  */
// export function createOffscreenCanvas(
//     width: number,
//     height: number,
//     clearColor: string = 'white'
// ): OffscreenCanvasRenderingContext2D {
//     const offscreenCanvas = new OffscreenCanvas(width, height)
//     const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true })
//     if (!offCtx) {
//         throw new Error('Could not create OffscreenCanvasRenderingContext2D')
//     }
//     offCtx.clearRect(0, 0, width, height)
//     offCtx.setRange = setCanvasRange.bind(offCtx)
//     offCtx.clear = clear.bind(offCtx)
//     offCtx.draw = (...params) => draw(offCtx, ...params)
// return offCtx
// }

// interface CanvasInfo {
//     min: [number, number]
//     max: [number, number]
//     xRange: number
//     yRange: number
//     //         span, // Add the span to the canvasInfo
// }

/**
 * Sets the canvas range for a given CanvasRenderingContext2D.
 * This function scales and translates the canvas to fit the range [min, max] into the canvas dimensions,
 * and flips the Y axis.
 *
 * @param ctx - The CanvasRenderingContext2D to set the range for.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 */
function setCanvasRange(ctx: CanvasRenderingContext2D, min: number, max: number): CanvasRangeInfo {
    // Retrieve the canvas dimensions from the context
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    // Determine the shortest side
    const size = Math.min(width, height)

    // Calculate the scale factor to fit [min, max] into the shortest side
    const scaleFactor = size / (max - min)

    // Reset transformations to default
    ctx.resetTransform()

    // Set up scaling, flip the Y axis by using -scaleFactor for Y
    ctx.scale(scaleFactor, -scaleFactor)

    // Initialize translation values
    let translateX = 0
    let translateY = 0
    let excessWidth = 0
    let excessHeight = 0
    let xRange: [number, number] = [min, max]
    let yRange: [number, number] = [min, max]

    // Determine if width or height is the shortest dimension and calculate translation
    if (size === width) {
        // Width is the shortest, center vertically
        excessHeight = height - width
        translateY = excessHeight / (2 * scaleFactor)
        ctx.translate(-min, -(max + translateY))
        // Update yRange to reflect the actual range being displayed
        const rescaleFactor = height / (max - min) / scaleFactor
        yRange = [min * rescaleFactor, max * rescaleFactor]
    } else {
        // Height is the shortest, center horizontally
        excessWidth = width - height
        translateX = excessWidth / (2 * scaleFactor)
        ctx.translate(-min + translateX, -max)
        // Update yRange to reflect the actual range being displayed
        const rescaleFactor = width / (max - min) / scaleFactor
        xRange = [min * rescaleFactor, max * rescaleFactor]
    }

    return {
        xRange,
        yRange,
    }
}