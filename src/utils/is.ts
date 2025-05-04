export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

export function isDef(value: unknown): boolean {
  return value !== undefined && value !== null
}

export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export function isNaN(value: unknown): boolean {
  return Number.isNaN(value)
}
