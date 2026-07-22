export interface BaseResponse<T> {
  code: number
  message: string
  data: T
}

export interface BasePaginationResponse<T> extends BaseResponse<T> {
  total: number
  page: number
  pageSize: number
}

export interface OptionItem {
  label: string
  value: string | number
}

export type NumberOrString = number | string
