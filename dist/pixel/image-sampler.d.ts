/**
 * Creates an image sampler function that samples pixel values from an image.
 * @param {string} imgUrl - The URL of the image to sample from.
 * @returns {Promise<Function>} A promise that resolves to the sampler function.
 */
export declare function createImageSampler(imgUrl: string): Promise<unknown>;
