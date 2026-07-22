import { createPinia } from 'pinia'

export { useAppStore } from './app'
export { useUserStore } from './user'

export const store = createPinia()
