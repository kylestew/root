export type Vec2 = [number, number]
export type Vec3 = [number, number, number]

export type Pt = { x: number; y: number } | { x: number; y: number; z: number }

import { Circle, Ellipse, Line, Polygon, Polyline, Quadratic, Rectangle } from './index'
export type Shape = Circle | Ellipse | Line | Polygon | Polyline | Quadratic | Rectangle

export type GeoData = Shape | Vec2 | GeoData[]

export interface Attribs {
    // 2D Drawing
    fill?: string
    stroke?: string
    weight?: number
    lineCap?: CanvasLineCap
    lineJoin?: CanvasLineJoin
    lineDash?: number[]

    // 3D Blender
    name?: string
    // material: ...
    rotation?: Vec3
    scale?: Vec3
}
