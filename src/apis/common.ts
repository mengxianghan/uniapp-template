import { request } from '@/utils'

export const getData = (params: unknown): Promise<unknown> => request.basic.get('/', params)
