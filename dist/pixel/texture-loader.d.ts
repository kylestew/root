/**
 * Creates an texture loader function that loads an image from a URL for use in binding to shaders.
 * @param {string} imgUrl - The URL of the image to sample from.
 * @returns {Promise<Function>} A promise that resolves to the image data or error.
 */
export declare function textureLoader(imgUrl: string): Promise<unknown>;
