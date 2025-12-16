export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

export function isDef(value: unknown): value is NonNullable<unknown> {
  return value !== undefined && value !== null
}

export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export function isNaN(value: unknown): boolean {
  return Number.isNaN(value)
}

export function isEmpty(value: unknown): value is '' | null | undefined {
  return isEmptyString(value) || value === null || value === undefined
}

export function isEmptyString(value: unknown): value is '' {
  return value === ''
}

export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return isObject(value) && isFunction(value.then) && isFunction(value.catch)
}

export function isFunction<T extends (...args: any[]) => any>(value: unknown): value is T {
  return typeof value === 'function'
}

export function isObject(value: unknown): value is Record<any, any> {
  return value !== null && typeof value === 'object'
}

export function isString(value: unknown): value is string {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function isPhoneNumber(value: string): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}
