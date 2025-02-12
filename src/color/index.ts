type RGB = {
    r: number
    g: number
    b: number
    a: number
}

type HSL = {
    h: number
    s: number
    l: number
}

export function color(value: string | number[] | RGB | HSL): any {
    // Copy out value to detach from the original object
    value = JSON.parse(JSON.stringify(value))

    // Utility function to convert hex to RGB
    function hexToRgb(hex: string): RGB {
        // Remove the leading # if present
        hex = hex.replace(/^#/, '')

        // If shorthand form (e.g. "03F") is used, convert to full form ("0033FF")
        if (hex.length === 3) {
            hex = hex
                .split('')
                .map((char) => char + char)
                .join('')
        }

        const bigint = parseInt(hex, 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255

        return { r, g, b, a: 1 } // assuming full opacity if not specified
    }

    // Utility function to convert RGB to Hex including alpha
    function rgbToHex({ r, g, b, a }: RGB): string {
        const alphaHex =
            a < 1
                ? Math.round(a * 255)
                      .toString(16)
                      .padStart(2, '0')
                      .toUpperCase()
                : ''
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}${alphaHex}`
    }

    // Utility function to convert RGBA to CSS string
    function rgbaToString({ r, g, b, a }: RGB): string {
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    // Utility function to convert RGB to HSL
    function rgbToHsl({ r, g, b }: RGB): HSL {
        r /= 255
        g /= 255
        b /= 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        let h: number,
            s: number,
            l: number = (max + min) / 2

        if (max === min) {
            h = s = 0 // achromatic
        } else {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0)
                    break
                case g:
                    h = (b - r) / d + 2
                    break
                case b:
                    h = (r - g) / d + 4
                    break
                default:
                    h = 0 // should never happen
            }
            h /= 6
        }

        return { h, s, l }
    }

    // Utility function to convert HSL to RGB
    function hslToRgb({ h, s, l }: HSL): RGB {
        let r: number, g: number, b: number

        if (s === 0) {
            r = g = b = l // achromatic
        } else {
            function hue2rgb(p: number, q: number, t: number): number {
                if (t < 0) t += 1
                if (t > 1) t -= 1
                if (t < 1 / 6) return p + (q - p) * 6 * t
                if (t < 1 / 2) return q
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
                return p
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s
            const p = 2 * l - q
            r = hue2rgb(p, q, h + 1 / 3)
            g = hue2rgb(p, q, h)
            b = hue2rgb(p, q, h - 1 / 3)
        }

        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: 1 }
    }

    // Utility function to calculate luminance
    function getLuminance({ r, g, b }: RGB): number {
        // Standard luminance formula
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    // Parse the input color value
    let colorObj: RGB | undefined
    if (typeof value === 'string') {
        if (value.startsWith('#')) {
            colorObj = hexToRgb(value)
        } else if (value.startsWith('rgba')) {
            const match = value.match(/rgba\((\d+), (\d+), (\d+), ([0-9.]+)\)/)
            if (match) {
                colorObj = {
                    r: parseInt(match[1], 10),
                    g: parseInt(match[2], 10),
                    b: parseInt(match[3], 10),
                    a: parseFloat(match[4]),
                }
            }
        } else if (value.startsWith('rgb')) {
            const match = value.match(/rgb\((\d+), (\d+), (\d+)\)/)
            if (match) {
                colorObj = {
                    r: parseInt(match[1], 10),
                    g: parseInt(match[2], 10),
                    b: parseInt(match[3], 10),
                    a: 1,
                }
            }
        }
    } else if (Array.isArray(value) && value.length === 3) {
        colorObj = {
            r: Math.round(value[0] * 255.0),
            g: Math.round(value[1] * 255.0),
            b: Math.round(value[2] * 255.0),
            a: 1.0,
        }
    } else if (Array.isArray(value) && value.length === 4) {
        if (value[0] > 1 || value[1] > 1 || value[2] > 1 || value[3] > 1) {
            colorObj = {
                r: value[0],
                g: value[1],
                b: value[2],
                a: value[3],
            }
        } else {
            colorObj = {
                r: Math.round(value[0] * 255.0),
                g: Math.round(value[1] * 255.0),
                b: Math.round(value[2] * 255.0),
                a: value[3],
            }
        }
    } else if (typeof value === 'object') {
        throw new Error('Fatal error')
        // colorObj = value
    }

    return {
        alpha: function (newAlpha: number): any {
            if (colorObj) {
                colorObj.a = newAlpha
            }
            return this
        },
        saturation: function (newSaturation: number): any {
            if (colorObj) {
                const hsl = rgbToHsl(colorObj)
                hsl.s = newSaturation
                const rgb = hslToRgb(hsl)
                colorObj.r = rgb.r
                colorObj.g = rgb.g
                colorObj.b = rgb.b
            }
            return this
        },
        toHex: function (): string | undefined {
            return colorObj ? rgbToHex(colorObj) : undefined
        },
        toRgba: function (): string | undefined {
            return colorObj ? rgbaToString(colorObj) : undefined
        },
        toHSL: function (): string | undefined {
            if (colorObj) {
                const { h, s, l } = rgbToHsl(colorObj)
                return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
            }
            return undefined
        },
        toGLSL: function (): number[] | undefined {
            return colorObj ? [colorObj.r / 255, colorObj.g / 255, colorObj.b / 255, colorObj.a] : undefined
        },
        toArray: function (): number[] | undefined {
            return colorObj ? [colorObj.r, colorObj.g, colorObj.b, colorObj.a * 255] : undefined
        },
        luminance: function (): number | undefined {
            return colorObj ? getLuminance(colorObj) : undefined
        },
    }
}
