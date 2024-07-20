import { Attribs, Shape } from '../types';
import { Circle, Line, Polygon, Rectangle } from '../index';
export declare function withAttribs(shape: Shape, attribs: Attribs): Circle | Line | Polygon | Rectangle;
