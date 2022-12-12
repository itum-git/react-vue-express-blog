import { defineStore } from 'pinia'
import { store } from '../index'

export const useDictStore = defineStore('dict', {
  state: () => ({
    isSetDict: false,
    dictObj: {}
  }),
  getters: {
    getDictObj() {
      return this.dictObj
    },
    getIsSetDict(){
      return this.isSetDict
    }
  },
  actions: {
    setDictObj(dictObj) {
      this.dictObj = dictObj
    },
    setIsSetDict(isSetDict) {
      this.isSetDict = isSetDict
    }
  }
})

export const useDictStoreWithOut = () => {
  return useDictStore(store)
}
