import { defineStore } from 'pinia'
import { store } from '../index'
import { useAuth } from '@/hooks/web/useAuth'

const auth = useAuth()

export const useUserStore = defineStore('user', {
  state: () => ({
    token: auth.getToken()
  }),
  getters: {
    getToken() {
      return this.token
    },
  },
  actions: {}
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
