/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */

import WebStorageCache from 'web-storage-cache'

let wsCaches = {}

const createCache = (type) => {
  const wsCache = new WebStorageCache({
    storage: type
  })

  return wsCache
}

export const useCache = (type = 'sessionStorage') => {

  if (!wsCaches[type]) {
    wsCaches[type] = createCache(type)
  }

  return {
    wsCache: wsCaches[type]
  }
}
