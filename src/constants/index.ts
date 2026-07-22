export const APP_NAME = 'uniapp-template'

export const STORAGE_TOKEN = 'token'
export const STORAGE_USER_INFO = 'user_info'
export const STORAGE_NAMESPACE = import.meta.env.VITE_STORAGE_NAMESPACE || 'uniapp_'

export const URL_API_BASIC = import.meta.env.VITE_API_BASIC || ''

export const HTTP_CODE_SUCCESS = 200
export const HTTP_CODE_UNAUTHORIZED = 401
export const HTTP_CODE_FORBIDDEN = 403
export const HTTP_CODE_IGNORES = [HTTP_CODE_SUCCESS, HTTP_CODE_UNAUTHORIZED]
