import { Rectangle } from '../geo/index';
import { draw, clear } from './draw';
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
export function createCanvas(width, height, existingCanvas = undefined, range = undefined) {
    // setup or bind to existing canvas
    let canvas = existingCanvas;
    if (!canvas) {
        // Create a new canvas element if it doesn't exist
        const newCanvas = document.createElement('canvas');
        // newCanvas.id = canvasId
        document.body.appendChild(newCanvas);
        canvas = newCanvas;
    }
    canvas.width = width;
    canvas.height = height;
    // get canvas context
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
        throw new Error('Canvas not supported in this browser!');
    }
    let rangeInfo;
    if (range != undefined) {
        rangeInfo = setCanvasRange(ctx, range);
    }
    return {
        ctx,
        canvas,
        range: rangeInfo,
        toPixelSpace: (pt) => toPixelSpace(ctx, pt),
        setRange: (range) => setCanvasRange(ctx, range),
        clear: (clearColor) => clear(ctx, clearColor),
        draw: (geo, attribs) => draw(ctx, geo, attribs),
    };
}
/**
 * Creates an offscreen canvas with the specified width and height.
 *
 * @param width - The width of the offscreen canvas.
 * @param height - The height of the offscreen canvas.
 *
 * @returns The OffscreenCanvasRenderingContext2D object representing the offscreen canvas.
 * @throws Error if the OffscreenCanvasRenderingContext2D cannot be created.
 */
export function createOffscreenCanvas(width, height, range = undefined) {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
        throw new Error('Could not create OffscreenCanvasRenderingContext2D');
    }
    let rangeInfo;
    if (range != undefined) {
        rangeInfo = setCanvasRange(ctx, range);
    }
    return {
        ctx,
        canvas,
        range: rangeInfo,
        toPixelSpace: (pt) => toPixelSpace(ctx, pt),
        setRange: (range) => setCanvasRange(ctx, range),
        clear: (clearColor) => clear(ctx, clearColor),
        draw: (geo, attribs) => draw(ctx, geo, attribs),
    };
}
/**
 * Sets the canvas range for a given CanvasRenderingContext2D.
 * This function scales and translates the canvas to fit the range [min, max] into the canvas dimensions,
 * and flips the Y axis.
 *
 * @param ctx - The CanvasRenderingContext2D to set the range for.
 * @param range - The minimum and maximum values of the range.
 */
function setCanvasRange(ctx, range) {
    const [min, max] = range;
    // Retrieve the canvas dimensions from the context
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    // Determine the shortest side
    const size = Math.min(width, height);
    // Calculate the scale factor to fit [min, max] into the shortest side
    const scaleFactor = size / (max - min);
    // Reset transformations to default
    ctx.resetTransform();
    // Set up scaling, flip the Y axis by using -scaleFactor for Y
    ctx.scale(scaleFactor, -scaleFactor);
    // Initialize translation values
    let translateX = 0;
    let translateY = 0;
    let excessWidth = 0;
    let excessHeight = 0;
    let xRange = [min, max];
    let yRange = [min, max];
    // Determine if width or height is the shortest dimension and calculate translation
    if (size === width) {
        // Width is the shortest, center vertically
        excessHeight = height - width;
        translateY = excessHeight / (2 * scaleFactor);
        ctx.translate(-min, -(max + translateY));
        // Update yRange to reflect the actual range being displayed
        const rescaleFactor = height / (max - min) / scaleFactor;
        yRange = [min * rescaleFactor, max * rescaleFactor];
    }
    else {
        // Height is the shortest, center horizontally
        excessWidth = width - height;
        translateX = excessWidth / (2 * scaleFactor);
        ctx.translate(-min + translateX, -max);
        // Update yRange to reflect the actual range being displayed
        const rescaleFactor = width / (max - min) / scaleFactor;
        xRange = [min * rescaleFactor, max * rescaleFactor];
    }
    const rect = new Rectangle([xRange[0], yRange[0]], [xRange[1] - xRange[0], yRange[1] - yRange[0]]);
    return {
        xRange,
        yRange,
        rect,
    };
}
function toPixelSpace(ctx, pt) {
    const [x, y] = pt;
    // Get the current transformation matrix
    const transform = ctx.getTransform();
    // Create a point object with the input coordinates
    const point = new DOMPoint(x, y);
    // Apply the inverse transformation to the point
    const transformedPoint = transform.transformPoint(point);
    // Return the original canvas coordinates
    return [transformedPoint.x, transformedPoint.y];
}
//# sourceMappingURL=canvas-utils.js.map