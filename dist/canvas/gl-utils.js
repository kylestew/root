import { createShader, createShaderProgram } from './shader-program';
/**
 * Creates a WebGL canvas with the specified width and height.
 *
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 * @param existingCanvas - Canvas HTML element to bind to (creates one if not provided).
 *
 * @returns The WebGL rendering context.
 * @throws Error if WebGL is not supported in the browser.
 */
export function createGLCanvas(width, height, existingCanvas = undefined) {
    // setup or bind to existing canvas
    let canvas = existingCanvas;
    if (!canvas) {
        // Create a new canvas element if it doesn't exist
        const newCanvas = document.createElement('canvas');
        // newCanvas.id = canvasId
        document.body.appendChild(newCanvas);
        canvas = newCanvas;
    }
    canvas.width = width;
    canvas.height = height;
    // preserve buffer to CMD+S saving
    const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true });
    if (!gl) {
        throw new Error('WebGL not supported in this browser!');
    }
    // Declaring variables for buffers
    let positionBuffer = null;
    let texCoordBuffer = null;
    return {
        glCtx: gl,
        TEXTURE0: gl.TEXTURE0,
        TEXTURE1: gl.TEXTURE1,
        TEXTURE2: gl.TEXTURE2,
        TEXTURE3: gl.TEXTURE3,
        clear: function (color = [0, 0, 0, 0]) {
            const [r, g, b, a] = color;
            gl.clearColor(r, g, b, a); // Clear to black, fully opaque
            gl.clearDepth(1.0); // Clear everything
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        },
        loadShader: function (vertexShaderSource, fragmentShaderSource) {
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            if (!vertexShader) {
                console.error('Failed to create vertex shader');
                return null;
            }
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
            if (!fragmentShader) {
                console.error('Failed to create fragment shader');
                return null;
            }
            const shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
            return shaderProgram;
        },
        useShader: function (program) {
            gl.useProgram(program);
        },
        setUniform: function (name, value) {
            const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
            const uniformLocation = gl.getUniformLocation(currentProgram, name);
            if (uniformLocation === null) {
                console.warn(`Uniform '${name}' not found.`);
                return;
            }
            // Check the type of the value and use the appropriate uniform function
            if (typeof value === 'number') {
                gl.uniform1f(uniformLocation, value);
            }
            else if (typeof value === 'boolean') {
                gl.uniform1i(uniformLocation, value ? 1 : 0);
            }
            else if (Array.isArray(value)) {
                switch (value.length) {
                    case 2:
                        gl.uniform2fv(uniformLocation, value);
                        break;
                    case 3:
                        gl.uniform3fv(uniformLocation, value);
                        break;
                    case 4:
                        gl.uniform4fv(uniformLocation, value);
                        break;
                    default:
                        console.error(`Unsupported uniform array size: ${value.length}`);
                }
            }
            else if (value instanceof Float32Array) {
                switch (value.length) {
                    case 9:
                        gl.uniformMatrix3fv(uniformLocation, false, value);
                        break;
                    case 16:
                        gl.uniformMatrix4fv(uniformLocation, false, value);
                        break;
                    default:
                        console.error(`Unsupported uniform matrix size: ${value.length}`);
                }
            }
            else {
                console.error(`Unsupported uniform type for '${name}'`);
            }
        },
        useTexture: function (textureId, uniformName, data) {
            const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
            gl.activeTexture(textureId);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            if (data instanceof HTMLCanvasElement || data instanceof OffscreenCanvas || data instanceof ImageBitmap) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
            }
            else {
                gl.bindTexture(gl.TEXTURE_2D, data);
            }
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            // Connect the texture to the shader uniform
            const uniformLocation = gl.getUniformLocation(currentProgram, uniformName);
            // Since textureId typically is gl.TEXTURE0 + n, extract 'n' to set as the uniform
            const textureUnitIndex = textureId - gl.TEXTURE0;
            gl.uniform1i(uniformLocation, textureUnitIndex);
        },
        drawScreen: function () {
            // Initialize buffers if they haven't been created yet
            if (!positionBuffer) {
                positionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                const positions = new Float32Array([
                    -1,
                    -1, // First triangle
                    1,
                    -1,
                    -1,
                    1,
                    -1,
                    1, // Second triangle
                    1,
                    -1,
                    1,
                    1,
                ]);
                gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
                texCoordBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
                const textureCoords = new Float32Array([
                    0.0,
                    0.0, // Corresponds to -1, -1
                    1.0,
                    0.0, // Corresponds to  1, -1
                    0.0,
                    1.0, // Corresponds to -1,  1
                    0.0,
                    1.0, // Second triangle
                    1.0,
                    0.0,
                    1.0,
                    1.0,
                ]);
                gl.bufferData(gl.ARRAY_BUFFER, textureCoords, gl.STATIC_DRAW);
            }
            const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
            // Setup for position attribute
            const positionAttributeLocation = gl.getAttribLocation(currentProgram, 'aPosition');
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
            // Setup for texture coordinate attribute
            const texCoordAttributeLocation = gl.getAttribLocation(currentProgram, 'aTexCoord');
            gl.enableVertexAttribArray(texCoordAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
            // Draw the triangles
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        },
    };
}
//# sourceMappingURL=gl-utils.js.map