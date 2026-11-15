import { extendTailwindMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // 扩展字号规则：以 text-[ 开头，且括号内是数字+单位的，归为字号
      'font-size': [
        {
          text: [
            (value: string) => /^[\d.]+(?:px|rem|em|%)$/.test(value),
          ],
        },
      ],
      // 扩展颜色规则：以 text-[ 开头，且括号内是 # / rgb / hsl 的，归为颜色
      'text-color': [
        {
          text: [
            (value: string) => /^(?:#|rgb|hsl)/.test(value),
          ],
        },
      ],
    },
  },
})

export const cn = (...args: unknown[]) => customTwMerge(normalizeClass(args))
