import uni from '@dcloudio/vite-plugin-uni'
import uniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      uniLayouts(),
      uni(),
      UnifiedViteWeappTailwindcssPlugin(),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          tailwindcss(),
        ],
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    server: {
      host: '0.0.0.0',
    },
  })
}
