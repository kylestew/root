/**
 * Creates an image sampler function that samples pixel values from an image.
 * @param {string} imgUrl - The URL of the image to sample from.
 * @returns {Promise<Function>} A promise that resolves to the sampler function.
 */
export async function createImageSampler(imgUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'Anonymous'; // Needed if the image is from a different origin
        image.src = imgUrl;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) {
                reject(new Error('Failed to get 2D context'));
                return;
            }
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0); // needs to be drawn into canvas for sampling
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            /**
             * Sampler function that samples pixel values from the image.
             * @param {number[]} uv - The sampling coordinate (between 0 and 1).
             * @returns {number[]} An array containing the RGBA values of the sampled pixel.
             */
            function sampler(uv) {
                const x = Math.floor(uv[0] * canvas.width);
                const y = Math.floor((1 - uv[1]) * canvas.height);
                const i = (y * canvas.width + x) * 4;
                return [data[i], data[i + 1], data[i + 2], data[i + 3]];
            }
            resolve({ sampler, imageData });
        };
        image.onerror = reject;
    });
}
//# sourceMappingURL=image-sampler.js.map