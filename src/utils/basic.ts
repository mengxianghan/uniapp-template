import { twMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'

export const clsx = (...args: unknown[]) => twMerge(normalizeClass(args))

export function debounce(func: (...args: any[]) => any, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null

  return function (this: any, ...args: any[]) {
    // eslint-disable-next-line ts/no-this-alias
    const context = this

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function sleep(timeout: number): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export function noop() {}
