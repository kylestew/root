import { random } from 'root/random'

// == CONSTANTS ==
const dim = 500
const k = 22

class Sweep {
    constructor(x, y, gage) {
        console.log('sweep', x, y, gage)
        this.x = x
        this.y = y
        this.gage = gage

        this.restartSweep()
    }

    restartSweep() {
        // restart sweep

        // this.myColor = somecolor();
        this.sg = 123
        this.vx = 1.0
    }

    render() {
        // move through time
        this.x += this.vx
        if (this.x > dim) this.restartSweep()
    }
}

let sweeps = []
const g = Math.floor(dim / k)
for (let y = 0; y < k; y++) {
    sweeps.push(new Sweep(0, random(dim), g * 10))
}

// setup and clear canvas
const canvas = document.getElementById('mainCanvas')
const ctx = canvas.getContext('2d')
canvas.width = dim
canvas.height = dim
ctx.fillStyle = '#FFFFFF'
ctx.fillRect(0, 0, canvas.width, canvas.height)

let time = 0
function loop() {
    time++
    // sweeps.forEach(sweep => {
    //     sweep.render()
    // })
}
