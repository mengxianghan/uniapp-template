export class ResponseError extends Error {
  code: number

  constructor(message: string, code: number) {
    super()
    this.code = code
    this.name = 'ResponseError'
  }
}
