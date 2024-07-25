/**
 * Performs the flood fill algorithm on a canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context to perform the flood fill on.
 * @param {number[]} startPt - The starting point for the flood fill, in canvas coordinates.
 * @param {string} fillColor - The color to fill the area with.
 * @param {CanvasRenderingContext2D} [outputCtx=ctx] - The output canvas context to put the modified image data into (expected to be same size as ctx).
 */
export function floodFillCanvas(ctx, startPt, fillColor, outputCtx = ctx) {
    // dump the canvas data
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    // setup the output canvas data
    let outputData = data;
    let outputCtxData = imageData;
    if (ctx != outputCtx) {
        // output is a different canvas
        outputCtxData = outputCtx.getImageData(0, 0, width, height);
        outputData = outputCtxData.data;
    }
    // setup initial conditions
    const stack = [startPt];
    const startColor = getColorAtPixel(data, startPt[0], startPt[1], width);
    if (colorsMatch(startColor, fillColor)) {
        return false;
    }
    console.log(startColor);
    console.log(fillColor);
    // while (stack.length > 0) {
    //     const point = stack.pop()
    //     if (!point) {
    //         break
    //     }
    //     const [px, py] = point
    //     const currentColor = getColorAtPixel(data, px, py, width)
    //     if (colorsMatch(currentColor, startColor)) {
    //         setColorAtPixel(data, px, py, width, fillColor)
    //         setColorAtPixel(outputData, px, py, width, fillColor)
    //         // Push neighboring pixels onto the stack
    //         if (px > 0) stack.push([px - 1, py])
    //         if (px < width - 1) stack.push([px + 1, py])
    //         if (py > 0) stack.push([px, py - 1])
    //         if (py < height - 1) stack.push([px, py + 1])
    //     }
    // }
    // Put the modified image data back into the canvas
    outputCtx.putImageData(outputCtxData, 0, 0);
    return true;
}
function getColorAtPixel(data, x, y, width) {
    const index = (y * width + x) * 4;
    return [data[index], data[index + 1], data[index + 2], data[index + 3]];
}
function setColorAtPixel(data, x, y, width, color) {
    const index = (y * width + x) * 4;
    data[index] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
    data[index + 3] = color[3];
}
function colorsMatch(color1, color2) {
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
}
//# sourceMappingURL=flood-fill.js.map