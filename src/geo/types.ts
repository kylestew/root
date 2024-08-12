export type Vec2 = [number, number]
export type Vec3 = [number, number, number]
export type Vec = Vec2 | Vec3

export function toVec2(value: number | Vec2 | Vec3): Vec2 {
    if (typeof value === 'number') {
        // If the value is a single number, create a Vec2 where both components are the same
        return [value, value]
    } else if (value.length === 2) {
        // If the value is already a Vec2, return it as-is
        return value
    } else if (value.length === 3) {
        // If the value is a Vec3, return the first two components as a Vec2
        return [value[0], value[1]]
    } else {
        throw new Error('Invalid input type for toVec2 function')
    }
}

export function toVec3(value: number | Vec2 | Vec3): Vec3 {
    if (typeof value === 'number') {
        // If the value is a single number, create a Vec3 where all three components are the same
        return [value, value, value]
    } else if (value.length === 2) {
        // If the value is a Vec2, add a third component with a value of 0
        return [value[0], value[1], 0]
    } else if (value.length === 3) {
        // If the value is already a Vec3, return it as-is
        return value
    } else {
        throw new Error('Invalid input type for toVec3 function')
    }
}

export type Pt = { x: number; y: number } | { x: number; y: number; z: number }

import { Circle, Ellipse, Line, Polygon, Polyline, Quadratic, Rectangle } from './index'
import { Cube } from './index'
export type Shape2D = Circle | Ellipse | Line | Polygon | Polyline | Quadratic | Rectangle
export type Shape3D = Cube
export type Shape = Shape2D | Shape3D

export type GeoData = Shape | Vec2 | GeoData[]

export interface Attribs {
    // 2D Drawing
    fill?: string
    stroke?: string
    weight?: number
    lineCap?: CanvasLineCap
    lineJoin?: CanvasLineJoin
    lineDash?: number[]

    rotation?: Vec3
    scale?: Vec3
}
