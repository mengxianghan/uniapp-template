import { extendTailwindMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'

// weapp-tailwindcss 官方转义映射（@weapp-core/escape 的 MappingChars2String）
// 小程序端类名中的特殊字符会被转义（如 text-[16px] → text-_b16px_B），
// 校验归组前先按此映射还原，保证跨端合并行为一致
const mpEscapeMap: Record<string, string> = {
  _b: '[',
  _B: ']',
  _p: '(',
  _P: ')',
  _h: '#',
  _e: '!',
  _f: '/',
  _r: '\\',
  _d: '.',
  _c: ':',
  _v: '%',
  _m: ',',
  _a: '\'',
  _q: '"',
  _x: '*',
  _n: '&',
  _t: '@',
  _k: '{',
  _K: '}',
  _u: '+',
  _j: ';',
  _l: '<',
  _w: '~',
  _z: '=',
  _g: '>',
  _Q: '?',
  _y: '^',
  _i: '`',
  _o: '|',
  _s: '$',
}

function decodeMpClass(value: string) {
  return value.replace(/_([a-z])/gi, seq => mpEscapeMap[seq] ?? seq)
}

const fontSizeRe = /^[\d.]+(?:px|rem|em|%)$/
const textColorRe = /^(?:#|rgb|hsl)/

// 括号内是数字+单位的，归为字号（text-[16px] / 小程序转义的 text-_b16px_B）
function isFontSize(value: string) {
  if (fontSizeRe.test(value))
    return true
  const decoded = decodeMpClass(value)
  return decoded !== value && fontSizeRe.test(decoded.replace(/^\[(.*)\]$/, '$1'))
}

// 括号内是 # / rgb / hsl 的，归为颜色（text-[#fff] / 小程序转义的 text-_hfff_B）
function isTextColor(value: string) {
  if (textColorRe.test(value))
    return true
  const decoded = decodeMpClass(value)
  return decoded !== value && textColorRe.test(decoded.replace(/^\[(.*)\]$/, '$1'))
}

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [isFontSize] }],
      'text-color': [{ text: [isTextColor] }],
    },
  },
})

export const cn = (...args: unknown[]) => customTwMerge(normalizeClass(args))
