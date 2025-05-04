import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite'

export const weappTailwindcssPlugin = UnifiedViteWeappTailwindcssPlugin

export const autoprefixerPostcssPlugin = autoprefixer

export const tailwindcssPostcssPlugin = tailwindcss
