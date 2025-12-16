import { defineStore } from 'pinia'
import { onAppInit } from '@/utils'

interface AppState {
  completed: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    completed: false,
  }),

  getters: {},

  actions: {
    init() {
      return new Promise((resolve) => {
        ;(async () => {
          await Promise.all([])
          this.completed = true

          onAppInit()

          resolve(true)
        })()
      })
    },
  },
})
