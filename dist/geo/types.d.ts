export type Vec2 = [number, number];
export type Pt = {
    x: number;
    y: number;
};
import { Circle, Ellipse, Line, Polygon, Polyline, Quadratic, Rectangle } from './index';
export type Shape = Circle | Ellipse | Line | Polygon | Polyline | Quadratic | Rectangle;
export type GeoData = Shape | Vec2 | GeoData[];
export interface Attribs {
    fill?: string;
    stroke?: string;
    weight?: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
    lineDash?: number[];
}
