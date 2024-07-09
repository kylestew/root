export type Vec2 = [number, number]

export interface Attribs {
    fill?: string
    stroke?: number

    [key: string]: any
}

import { Circle, Ellipse, Line, Polygon, Polyline, Quadratic, Rectangle } from './index'
export type Shape = Circle | Ellipse | Line | Polygon | Polyline | Quadratic | Rectangle
