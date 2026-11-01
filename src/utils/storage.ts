import { createStorage } from 'uni-vant-storage'
import { STORAGE_NAMESPACE } from '@/constants'

export const storage = createStorage({
  namespace: STORAGE_NAMESPACE,
})
