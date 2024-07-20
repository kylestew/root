// Adjust the import statement to match your project structure
// and ensure that all types are correctly imported
/**
 * Converts a geometric object to a Path2D object.
 *
 * @param shape - The geometric shape to convert
 *
 * @returns {Path2D} - The converted Path2D object.
 * @throws {Error} - If the conversion method is not implemented for the given geometric object.
 */
export function asPath(shape) {
    if (Array.isArray(shape)) {
        let paths = new Path2D();
        for (let element of shape) {
            paths.addPath(asPath(element));
        }
        return paths;
    }
    let path = new Path2D();
    const typeName = shape.constructor.name;
    switch (typeName) {
        case 'Arc': {
            const arc = shape;
            const [x, y] = arc.pos;
            path.arc(x, y, arc.r, arc.start, arc.end, arc.clockwise);
            break;
        }
        case 'Circle': {
            const circle = shape;
            const [x, y] = circle.pos;
            path.arc(x, y, circle.r, 0, Math.PI * 2);
            break;
        }
        case 'Ellipse': {
            const ellipse = shape;
            const [x, y] = ellipse.pos;
            const [radX, radY] = ellipse.r;
            path.ellipse(x, y, radX, radY, 0, 0, 2.0 * Math.PI);
            break;
        }
        case 'Polyline': {
            const polyline = shape;
            polyline.pts.forEach((pt, idx) => {
                let x, y;
                if (Array.isArray(pt)) {
                    ;
                    [x, y] = pt;
                }
                else {
                    ;
                    ({ x, y } = pt);
                }
                if (idx === 0) {
                    path.moveTo(x, y);
                }
                else {
                    path.lineTo(x, y);
                }
            });
            break;
        }
        case 'Line': {
            const line = shape;
            path.moveTo(line.pts[0][0], line.pts[0][1]);
            path.lineTo(line.pts[1][0], line.pts[1][1]);
            break;
        }
        case 'Polygon': {
            const polygon = shape;
            polygon.pts.forEach((pt, idx) => {
                const [x, y] = pt;
                if (idx === 0) {
                    path.moveTo(x, y);
                }
                else {
                    path.lineTo(x, y);
                }
            });
            path.closePath();
            break;
        }
        case 'Quadratic': {
            const quadratic = shape;
            const [start, ctrl, dest] = quadratic.pts;
            path.moveTo(start[0], start[1]);
            path.quadraticCurveTo(ctrl[0], ctrl[1], dest[0], dest[1]);
            break;
        }
        // case 'Ray': {
        //     const ray = shape as Ray
        //     const [x, y] = ray.pos
        //     const [dx, dy] = ray.dir
        //     // Calculate a point far along the direction to simulate the "infinite" ray
        //     const length = 1000 // You can adjust this length as needed
        //     const endX = x + dx * length
        //     const endY = y + dy * length
        //     path.moveTo(x, y)
        //     path.lineTo(endX, endY)
        //     break
        // }
        case 'Rectangle': {
            const rectangle = shape;
            path.rect(rectangle.pos[0], rectangle.pos[1], rectangle.size[0], rectangle.size[1]);
            break;
        }
        default:
            throw new Error(`Method not implemented on ${typeName}`);
    }
    return path;
}
