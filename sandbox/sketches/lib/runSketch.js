export default function runSketch(sketch, defaultPalette, { canvas, width, height }) {
    // Run the sketch - expect to get back render function
    const renderer = sketch(defaultPalette)

    // TODO: allow 3D canvas
    const context = canvas.getContext('2d')

    let pixelRatio = window.devicePixelRatio || 1
    let lastTime = Date.now()
    let time = 0
    let raf = null

    function resize() {
        pixelRatio = window.devicePixelRatio
        canvas.width = width * pixelRatio
        canvas.height = height * pixelRatio
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        // render()
    }
    // NOTE: no resize event listener - assuming fixed size canvas
    // window.addEventListener('resize', resize)
    resize()

    // look at meta for animation toggle
    const animated = sketch.animated || false
    if (animated) start()

    function start() {
        lastTime = Date.now()
        raf = requestAnimationFrame(animate)
    }

    function stop() {
        cancelAnimationFrame(raf)
        raf = null
    }

    function animate() {
        raf = requestAnimationFrame(animate)
        const now = Date.now()
        const dt = (now - lastTime) / 1000
        lastTime = now
        time += dt
        render(dt)
    }

    function render(deltaTime = 0) {
        context.save()
        context.scale(pixelRatio, pixelRatio)
        renderer({ canvas, context, width, height, pixelRatio, time, deltaTime })
        context.restore()
    }
}
