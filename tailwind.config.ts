import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        araboto: ['Araboto', 'sans-serif'], 
        atyp: ['Atyp', 'sans-serif'],
      },
      colors: {
        'cusBlue': '#4A28A8',
      },
      backgroundImage: {
      
      },
    },
  },
  plugins: [daisyui],
}
export default config
