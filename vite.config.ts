import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'
import { autoprefixerPostcssPlugin, server, tailwindcssPostcssPlugin, weappTailwindcssPlugin } from './configs'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
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
