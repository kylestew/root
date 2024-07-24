import { GeoData, Attribs } from '../geo/types';
import { Rectangle } from '../geo/index';
interface CanvasRangeInfo {
    xRange: [number, number];
    yRange: [number, number];
    rect: Rectangle;
}
interface CanvasCommands {
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    canvas: HTMLCanvasElement | OffscreenCanvas;
    range: CanvasRangeInfo | undefined;
    toPixelSpace: (pt: [number, number]) => [number, number];
    setRange: (range: [number, number]) => CanvasRangeInfo;
    clear: (clearColor: string) => void;
    draw: (geo: GeoData, attribs: Attribs) => void;
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
export declare function createCanvas(width: number, height: number, existingCanvas?: HTMLCanvasElement | undefined, range?: [number, number] | undefined): CanvasCommands;
/**
 * Creates an offscreen canvas with the specified width and height.
 *
 * @param width - The width of the offscreen canvas.
 * @param height - The height of the offscreen canvas.
 *
 * @returns The OffscreenCanvasRenderingContext2D object representing the offscreen canvas.
 * @throws Error if the OffscreenCanvasRenderingContext2D cannot be created.
 */
export declare function createOffscreenCanvas(width: number, height: number, range?: [number, number] | undefined): CanvasCommands;
export {};
