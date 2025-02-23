interface SketchOptions {
    canvas: HTMLCanvasElement
    width: number
    height: number
}

interface SketchContext {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D | WebGL2RenderingContext
    width: number
    height: number
    pixelRatio: number
    time: number
    deltaTime: number
}

interface Sketch {
    (context: CanvasRenderingContext2D | WebGL2RenderingContext, options: any): (props: SketchContext) => void
    webgl?: boolean
    animated?: boolean
}

export function runSketch(sketch: Sketch, options: any): void {
    const canvas = options.canvas
    const width = options.width
    const height = options.height

    // Check if sketch requests WebGL context
    const useWebGL = sketch.webgl || false
    const context = useWebGL ? canvas.getContext('webgl2', { preserveDrawingBuffer: true }) : canvas.getContext('2d')
    if (!context) {
        throw new Error(`Failed to get ${useWebGL ? 'WebGL2' : '2D'} context`)
    }
    const ctx = context as CanvasRenderingContext2D | WebGL2RenderingContext

    let pixelRatio = window.devicePixelRatio || 1
    let lastTime = Date.now()
    let time = 0
    let raf: number | null = null

    // Run the sketch - expect to get back render function
    const renderer = sketch(ctx, options)

    // if renderer doesn't return anything, assume its complete
    if (renderer === undefined) return

    function resize() {
        pixelRatio = window.devicePixelRatio
        canvas.width = width * pixelRatio
        canvas.height = height * pixelRatio
        // canvas.style.width = `${width}px`
        // canvas.style.height = `${height}px`

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
        if (raf !== null) {
            cancelAnimationFrame(raf)
        }
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
        if (ctx instanceof CanvasRenderingContext2D) {
            ctx.save()
            ctx.scale(pixelRatio, pixelRatio)
            renderer({ canvas, context: ctx, width, height, pixelRatio, time, deltaTime })
            ctx.restore()
        } else if (ctx instanceof WebGL2RenderingContext) {
            renderer({ canvas, context: ctx, width, height, pixelRatio, time, deltaTime })
        }
    }

    // look at meta for animation toggle
    const animated = sketch.animated || false
    if (animated) start()
    else render() // run once if not animated
}
