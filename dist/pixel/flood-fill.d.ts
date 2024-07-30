import { Vec2 } from '../geo/types';
/**
 * Performs the flood fill algorithm on a canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context to perform the flood fill on.
 * @param {number[]} startPt - The starting point for the flood fill, in canvas coordinates.
 * @param {string} fillColor - The color to fill the area with.
 * @param {CanvasRenderingContext2D} [outputCtx=ctx] - The output canvas context to put the modified image data into (expected to be same size as ctx).
 */
export declare function floodFillCanvas(ctx: CanvasRenderingContext2D, startPt: Vec2, fillColor: Color, outputCtx?: CanvasRenderingContext2D): boolean;
type Color = [number, number, number, number];
export {};
