import { request } from '@/utils'

export const getData = params => request.basic.get('/', params)
