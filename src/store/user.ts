import { defineStore } from 'pinia'
import { STORAGE_TOKEN, STORAGE_USER_INFO } from '@/constants/storage'
import { storage } from '@/utils'

interface UserState {
  token: string
  userInfo: { username: string } | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: storage.getItem(STORAGE_TOKEN, ''),
    userInfo: storage.getItem(STORAGE_USER_INFO, null),
  }),

  getters: {
    isLogin: state => !!state.token,
  },

  actions: {
    logout() {
      this.setUserInfo(null)
      this.setToken('')
    },

    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
      storage.setItem(STORAGE_USER_INFO, userInfo)
    },

    setToken(token: string) {
      this.token = token
      storage.setItem(STORAGE_TOKEN, token)
    },
  },
})
