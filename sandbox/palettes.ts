import { pickRandom } from 'root/random'

export interface Palette {
    background: string
    primary: string
    secondary: string
    accent: string
    dark: string
    neutral: string
}

const palettes: Palette[] = [
    // Shape of Design - Website
    {
        background: '#f5f5f5',
        primary: '#b95b23',
        secondary: '#000000',
        accent: '#ffffff',
        dark: '#333333',
        neutral: '#ffffff',
    },
]

// const palettes: Palette[] = [
//     // Blue Boy
//     {
//         background: '#e4dcc3',
//         primary: '#bc5037',
//         secondary: '#48667e',
//         accent: '#7a9ec0',
//         dark: '#294962',
//         neutral: '#dc9476',
//     },

//     // 70s Magazine Cover
//     {
//         background: '#eadfce',
//         primary: '#5a95bb',
//         secondary: '#fcbe43',
//         accent: '#F75D30',
//         dark: '#444347',
//         neutral: '#85796d',
//     },

//     // Color Class Palette
//     {
//         background: '#f4e9db',
//         primary: '#ed6249',
//         secondary: '#3a7cb0',
//         accent: '#eeb853',
//         dark: '#232429',
//         neutral: '#c9b7a1',
//     },

//     {
//         background: '#e0e4cc',
//         primary: '#f38630',
//         secondary: '#a7dbd8',
//         accent: '#fa6900',
//         dark: '#343434',
//         neutral: '#69d2e7',
//     },
//     {
//         background: '#83af9b',
//         primary: '#fe4365',
//         secondary: '#fc9d9a',
//         accent: '#c8c8a9',
//         dark: '#343434',
//         neutral: '#f9cdad',
//     },
//     {
//         background: '#fdfcdc',
//         primary: '#0081a7',
//         secondary: '#00afb9',
//         accent: '#f07167',
//         dark: '#343434',
//         neutral: '#fed9b7',
//     },
//     {
//         background: '#f1ebdf',
//         primary: '#5fc1b2',
//         secondary: '#dcdcdc',
//         accent: '#000000',
//         dark: '#343434',
//         neutral: '#decba5',
//     },
//     {
//         background: '#e8ddcb',
//         primary: '#036564',
//         secondary: '#cdb380',
//         accent: '#033649',
//         dark: '#343434',
//         neutral: '#031634',
//     },
//     {
//         background: '#add9f4',
//         primary: '#476c9b',
//         secondary: '#468c98',
//         accent: '#984447',
//         dark: '#343434',
//         neutral: '#101419',
//     },
//     {
//         background: '#3e4147',
//         primary: '#fffedf',
//         secondary: '#dfba69',
//         accent: '#2a2c31',
//         dark: '#343434',
//         neutral: '#5a2e2e',
//     },
//     {
//         background: '#2a363b',
//         primary: '#99b898',
//         secondary: '#fecea8',
//         accent: '#ff847c',
//         dark: '#e84a5f',
//         neutral: '#343434',
//     },
//     {
//         background: '#e5d9d3',
//         primary: '#4b8e8d',
//         secondary: '#f7c1bb',
//         accent: '#d9455f',
//         dark: '#2e2e2e',
//         neutral: '#a59b85',
//     },
//     {
//         background: '#f4ece2',
//         primary: '#3a506b',
//         secondary: '#ffcc00',
//         accent: '#5bc0be',
//         dark: '#1c2541',
//         neutral: '#d8e2dc',
//     },
//     {
//         background: '#e9e7df',
//         primary: '#d25b43',
//         secondary: '#d28144',
//         accent: '#568541',
//         dark: '#1a1a1a',
//         neutral: '#4068af',
//     },
// ]

// const selectedPalette = palettes[0]
const randomPalette = () => pickRandom(palettes)

export { randomPalette }
