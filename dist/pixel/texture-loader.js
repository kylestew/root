/**
 * Creates an texture loader function that loads an image from a URL for use in binding to shaders.
 * @param {string} imgUrl - The URL of the image to sample from.
 * @returns {Promise<Function>} A promise that resolves to the image data or error.
 */
export async function textureLoader(imgUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'Anonymous'; // Needed if the image is from a different origin
        image.src = imgUrl;
        image.onload = async () => {
            try {
                const imageBitmap = await createImageBitmap(image);
                resolve(imageBitmap);
            }
            catch (error) {
                reject(new Error('Failed to create ImageBitmap: ' + error));
            }
            // const canvas = document.createElement('canvas')
            // const ctx = canvas.getContext('2d', { willReadFrequently: true })
            // if (!ctx) {
            //     reject(new Error('Failed to get 2D context'))
            //     return
            // }
            // canvas.width = image.width
            // canvas.height = image.height
            // ctx.drawImage(image, 0, 0) // needs to be drawn into canvas for sampling
            // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            // resolve(imageData)
        };
        image.onerror = (error) => {
            reject(new Error('Failed to load image: ' + error));
        };
    });
}
//# sourceMappingURL=texture-loader.js.map