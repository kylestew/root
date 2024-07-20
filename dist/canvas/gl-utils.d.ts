interface GLCommands {
    glCtx: WebGL2RenderingContext;
    TEXTURE0: number;
    TEXTURE1: number;
    TEXTURE2: number;
    TEXTURE3: number;
    clear: (color?: number[]) => void;
    /**
     * Loads and compiles a shader program using the provided vertex and fragment shader sources.
     *
     * @param vertexShaderSource The source code of the vertex shader.
     * @param fragmentShaderSource The source code of the fragment shader.
     *
     * @returns The compiled shader program, or null if compilation fails.
     * @throws Error if the WebGL context has not been created yet.
     */
    loadShader: (vertexShaderSource: string, fragmentShaderSource: string) => WebGLProgram | null;
    useShader: (program: WebGLProgram) => void;
    /**
     * Sets a uniform variable in the currently used shader program.
     *
     * @param {string} name - The name of the uniform variable.
     * @param {number | number[] | Float32Array} value - The value to set the uniform variable to.
     */
    setUniform: (name: string, value: any) => void;
    /**
     * Binds a texture to a WebGL context and connects it to a shader uniform.
     *
     * @param textureId - The texture unit to bind the texture to.
     * @param uniformName - The name of the shader uniform to connect the texture to.
     * @param data - The texture data to bind. Can be an HTMLCanvasElement, OffscreenCanvas, or a WebGLTexture object.
     *
     * @throws Error if the WebGL context or current program is not available.
     */
    useTexture: (textureId: number, uniformName: string, data: TexImageSource) => void;
    /**
     * Draws the screen using WebGL.
     *
     * @throws {Error} If WebGL context or current program is not created yet.
     */
    drawScreen: () => void;
}
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
export declare function createGLCanvas(width: number, height: number, existingCanvas?: HTMLCanvasElement | undefined): GLCommands;
export {};
