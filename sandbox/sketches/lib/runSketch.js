export default function runSketch(sketch, options, { canvas, width, height }) {
    // Check if sketch requests WebGL context
    const useWebGL = sketch.webgl || false
    const context = useWebGL ? canvas.getContext('webgl2', { preserveDrawingBuffer: true }) : canvas.getContext('2d')
    if (!context) {
        throw new Error(`Failed to get ${useWebGL ? 'WebGL2' : '2D'} context`)
    }

    // Run the sketch - expect to get back render function
    const renderer = sketch(context, options)

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
        if (!useWebGL) {
            context.save()
            context.scale(pixelRatio, pixelRatio)
        }
        renderer({ canvas, context, width, height, pixelRatio, time, deltaTime })
        if (!useWebGL) {
            context.restore()
        }
    }

    // look at meta for animation toggle
    const animated = sketch.animated || false
    if (animated) start()
    else render() // run once if not animated
}
