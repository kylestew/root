import { Circle, Line } from '../index';
/**
 * Calculates the intersection points of a circle and a line segment.
 *
 * @param {Object} circle - The circle.
 * @param {Object} line - The line segment.
 * @returns {Array|null} - The intersection points [[x1, y1], [x2, y2]] or null if no intersection.
 */
export declare function circleLineIntersection(circle: Circle, line: Line): number[][] | null;
/**
 * Calculates the intersection points of a ray and a line segment.
 *
 * @param {Object} ray - The ray.
 * @param {Object} line - The line segment.
 * @returns {Array|null} - The intersection point [x, y] or null if no intersection.
 */
/**
 * Calculates the intersection point of two line segments.
 *
 * @param {Object} line1 - The first line segment.
 * @param {Object} line2 - The second line segment.
 * @returns {Array|null} - The intersection point [x, y] or null if no intersection.
 */
export declare function lineLineIntersection(line1: Line, line2: Line): number[] | null;
