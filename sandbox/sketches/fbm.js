import { fbm2D } from 'root/random'

export function sketch(ctx, options) {
    ctx.canvas.width = 800
    ctx.canvas.height = 800
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    // Create controls
    const controls = document.createElement('div')
    controls.style.position = 'fixed'
    controls.style.top = '10px'
    controls.style.left = '10px'
    controls.style.background = 'rgba(0,0,0,0.7)'
    controls.style.padding = '10px'
    controls.style.color = 'white'
    controls.style.fontFamily = 'monospace'

    const params = {
        scale: 2.0,
        octaves: 4,
        persistence: 0.5,
        lacunarity: 2.0,
    }

    // Add sliders
    const addSlider = (name, min, max, step, value) => {
        const div = document.createElement('div')
        div.style.marginBottom = '5px'

        const label = document.createElement('label')
        label.textContent = name
        label.style.display = 'block'
        label.style.marginBottom = '2px'

        const slider = document.createElement('input')
        slider.type = 'range'
        slider.min = min
        slider.max = max
        slider.step = step
        slider.value = value

        const valueDisplay = document.createElement('span')
        valueDisplay.style.marginLeft = '10px'
        valueDisplay.textContent = value

        slider.addEventListener('input', () => {
            const val = parseFloat(slider.value)
            valueDisplay.textContent = val
            params[name] = val
        })

        div.appendChild(label)
        div.appendChild(slider)
        div.appendChild(valueDisplay)
        controls.appendChild(div)
    }

    addSlider('scale', 0.1, 10, 0.1, params.scale)
    addSlider('octaves', 1, 8, 1, params.octaves)
    addSlider('persistence', 0.1, 1, 0.1, params.persistence)
    addSlider('lacunarity', 1.1, 4, 0.1, params.lacunarity)

    document.body.appendChild(controls)

    // Render loop
    function render() {
        // Clear canvas
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, width, height)

        // Draw noise pattern
        const imageData = ctx.createImageData(width, height)
        const data = imageData.data

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Convert to normalized coordinates (-1 to 1)
                const nx = (x / width) * 2 - 1
                const ny = (y / height) * 2 - 1

                // Sample FBM noise
                const noise = fbm2D(nx, ny, params.scale, params.octaves, params.persistence, params.lacunarity)

                // Convert to grayscale color
                const value = Math.floor(noise * 255)

                // Set pixel color
                const i = (y * width + x) * 4
                data[i] = value // R
                data[i + 1] = value // G
                data[i + 2] = value // B
                data[i + 3] = 255 // A
            }
        }

        ctx.putImageData(imageData, 0, 0)
        requestAnimationFrame(render)
    }

    render()
}
