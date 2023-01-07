import { defineStore } from 'pinia'
import { store } from '../index'
import { useAuth } from '@/hooks/web/useAuth'

const auth = useAuth()

export const useUserStore = defineStore('user', {
  state: () => ({
    token: auth.getToken(),
    userInfo: null,
    isAddRoutes: false
  }),
  getters: {
    getToken() {
      return this.token
    },
    getUserInfo() {
      return this.userInfo
    }
  },
  actions: {
    setToken(token) {
      this.token = token
      auth.setToken(token) 
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setIsAddRoutes(bool) {
      this.isAddRoutes = bool
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
