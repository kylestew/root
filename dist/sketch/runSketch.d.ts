interface SketchContext {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | WebGL2RenderingContext;
    width: number;
    height: number;
    pixelRatio: number;
    time: number;
    deltaTime: number;
}
export interface Sketch {
    (context: CanvasRenderingContext2D | WebGL2RenderingContext, options: any): ((props: SketchContext) => void) | null;
    webgl?: boolean;
    animated?: boolean;
}
export declare function runSketch(sketch: Sketch, options: any): void;
export {};
