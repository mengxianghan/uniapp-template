import { config } from '@/configs'
import { isDate, isNumber } from '@/utils'

interface IOptions {
  expires?: number | Date
}

export function useStorage(options?: IOptions) {
  const getKey = (key: string): string => {
    return `${config.get('storage.namespace')}${key}`
  }

  const setItem = (key: string, value: any, attrs?: IOptions) => {
    const { expires } = { ...(options || {}), ...(attrs || {}) }
    let date = null
    let exp = null

    if (isNumber(expires)) {
      date = new Date()
      date.setDate(date.getDate() + expires)
      exp = new Date(date)
    }
    if (isDate(expires)) {
      exp = expires
    }

    uni.setStorageSync(getKey(key), JSON.stringify({ value, expires: exp }))
  }

  const removeItem = (key: string) => {
    uni.removeStorageSync(getKey(key))
  }

  const getItem = (key: string, defaultValue: unknown = null) => {
    const data = JSON.parse(uni.getStorageSync(getKey(key)) || '{}')

    // 缓存未过期
    if (data?.expires === null || new Date(data?.expires).getTime() >= new Date().getTime()) {
      return data?.value
    }

    // 缓存已过期，清除缓存
    removeItem(key)

    return defaultValue
  }

  const clear = () => {
    uni.clearStorageSync()
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  }
}
