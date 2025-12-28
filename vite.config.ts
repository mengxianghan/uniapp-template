import uni from '@dcloudio/vite-plugin-uni'
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import { defineConfig } from 'vite'
import { autoprefixerPostcssPlugin, server, tailwindcssPostcssPlugin, weappTailwindcssPlugin } from './configs'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      uniLayouts(),
      uni(),
      weappTailwindcssPlugin(),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixerPostcssPlugin(),
          tailwindcssPostcssPlugin(),
        ],
      },
    },
    server,
  })
}
