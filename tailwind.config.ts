import type { Config } from 'tailwindcss'
import process from 'node:process'
import { addIconSelectors } from '@iconify/tailwind'
import rem2px from 'tailwindcss-rem-to-px'

export default <Config>{
  content: [
    './public/index.html',
    './src/**/*.{html,js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    rem2px({
      baseFontSize: 16,
    }),
    addIconSelectors([
      'tdesign',
      'weui',
    ]),
  ],
  corePlugins: {
    // 小程序不需要 preflight 样式，如果需要兼容 H5，需要使用环境变量控制
    preflight: process.env.UNI_PLATFORM === 'h5',
  },
}
