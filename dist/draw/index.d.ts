import { GeoData, Attribs } from '../geo/types';
export { handDrawnCircle } from './hand_drawn';
export declare function draw(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, geo: GeoData, attribs?: Attribs): void;
export declare function clear(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, clearColor: string): void;
