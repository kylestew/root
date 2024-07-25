/**
 * Performs linear interpolation between two numbers.
 * @param a - The starting value.
 * @param b - The ending value.
 * @param t - The interpolation factor, ranging from 0 to 1.
 * @returns The interpolated value between `a` and `b`.
 */
export function lerp(a, b, t) {
    return a + (b - a) * t;
}
/**
 * Linearly interpolates between two points.
 *
 * @param {number[]} pt1 - The first point.
 * @param {number[]} pt2 - The second point.
 * @param {number} pct - The interpolation percentage (between 0 and 1).
 * @returns {number[]} The interpolated point.
 */
export function lerpPt(pt1, pt2, pct) {
    return [pt1[0] + (pt2[0] - pt1[0]) * pct, pt1[1] + (pt2[1] - pt1[1]) * pct];
}
/**
 * Calculates the midpoint between two points.
 *
 * @param {number[]} pt1 - The first point, represented as an array of two numbers.
 * @param {number[]} pt2 - The second point, represented as an array of two numbers.
 * @returns {number[]} The midpoint between pt1 and pt2, represented as an array of two numbers.
 */
export function midPt(pt1, pt2) {
    return [(pt1[0] + pt2[0]) / 2, (pt1[1] + pt2[1]) / 2];
}
/**
 * Maps a value from one range to another range.
 *
 * @param {number} value - The value to be mapped.
 * @param {number} low1 - The lower bound of the input range.
 * @param {number} high1 - The upper bound of the input range.
 * @param {number} low2 - The lower bound of the output range.
 * @param {number} high2 - The upper bound of the output range.
 * @returns {number} The mapped value.
 */
export function mapRange(value, low1, high1, low2, high2) {
    // Calculate the ratio of the difference between the value and low1
    // to the total range (high1 - low1)
    let ratio = (value - low1) / (high1 - low1);
    // Apply the ratio to the new range (high2 - low2) and add the low2
    // to scale and shift the value appropriately
    return ratio * (high2 - low2) + low2;
}
/**
 * Maps a point [x, y] from one range to another range.
 *
 * @param {Array<number>} point - The point [x, y] to be mapped.
 * @param {Array<number>} inputRangeX - The lower and upper bounds of the input range for x.
 * @param {Array<number>} inputRangeY - The lower and upper bounds of the input range for y.
 * @param {Array<number>} outputRangeX - The lower and upper bounds of the output range for x.
 * @param {Array<number>} outputRangeY - The lower and upper bounds of the output range for y.
 * @returns {Array<number>} The mapped point [x, y].
 */
export function mapRange2D(point, inputRangeX, inputRangeY, outputRangeX, outputRangeY) {
    const [x, y] = point;
    const [low1X, high1X] = inputRangeX;
    const [low1Y, high1Y] = inputRangeY;
    const [low2X, high2X] = outputRangeX;
    const [low2Y, high2Y] = outputRangeY;
    const ratioX = (x - low1X) / (high1X - low1X);
    const ratioY = (y - low1Y) / (high1Y - low1Y);
    const mappedX = ratioX * (high2X - low2X) + low2X;
    const mappedY = ratioY * (high2Y - low2Y) + low2Y;
    return [mappedX, mappedY];
}
/**
 * Maps a set of points from the range [0, 1] to a rectangle defined by its position and maximum coordinates.
 * Optionally, clips the points to stay within the rectangle.
 *
 * @param pts - An array of points to be mapped.
 * @param rect - The rectangle to map the points to.
 * @param clip - Optional. If true, points outside the rectangle will be dropped. Default is false.
 * @returns An array of mapped points, filtered to remove any dropped points if clipping is enabled.
 */
export function map01toRect(pts, rect, clip = false) {
    const [x0, y0] = rect.pos;
    const [x1, y1] = rect.max;
    return pts
        .map(([x, y]) => {
        const remappedX = mapRange(x, 0, 1, x0, x1);
        const remappedY = mapRange(y, 0, 1, y0, y1);
        if (clip) {
            if (remappedX < x0 || remappedX > x1 || remappedY < y0 || remappedY > y1) {
                return null; // Drop the item
            }
            else {
                return [remappedX, remappedY];
            }
        }
        else {
            return [remappedX, remappedY]; // Just pass the value
        }
    })
        .filter((item) => item !== null); // Filter out dropped items
}
//# sourceMappingURL=math.js.map