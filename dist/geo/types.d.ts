export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Vec = Vec2 | Vec3;
export declare function toVec2(value: number | Vec2 | Vec3): Vec2;
export declare function toVec3(value: number | Vec2 | Vec3): Vec3;
export type Pt = {
    x: number;
    y: number;
} | {
    x: number;
    y: number;
    z: number;
};
import { Circle, Ellipse, Line, Polygon, Polyline, Quadratic, Rectangle } from './index';
import { Cube } from './index';
export type Shape2D = Circle | Ellipse | Line | Polygon | Polyline | Quadratic | Rectangle;
export type Shape3D = Cube;
export type Shape = Shape2D | Shape3D;
export type GeoData = Shape | Vec2 | GeoData[];
export interface Attribs {
    fill?: string;
    stroke?: string;
    weight?: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
    lineDash?: number[];
    position?: Vec3;
    rotation?: Vec3;
    scale?: Vec3;
}
