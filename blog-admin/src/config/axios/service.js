import axios from 'axios'
import qs from 'qs'
import { config } from './config'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { useAuth } from '@/hooks/web/useAuth'

const userStore = useUserStore()

const auth = useAuth()

const { base_url, success_code, white_list } = config

export const PATH_URL = base_url[import.meta.env.VITE_API_BASEPATH]

// 创建axios实例
const service = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.request_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 规范特殊请求
    formatRequestData(config)

    if (userStore.token) {
      config.headers['Authorization'] = auth.getToken()
    }
    
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.config.responseType === 'blob'|| response.config.responseType === 'arraybuffer') {
      // 如果是文件流，直接过
      return response
    } else if (response.data.code === success_code || white_list.includes(response.data.code)) {
      return response.data
    } else {
      ElMessage.error(response.data.message)
      return false
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

function formatRequestData(config) {
  if (
    config.method === 'post' &&
    (config.headers)['Content-Type'] ===
      'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data)
  }

   // get参数编码
  if (config.method === 'get' && config.params) {
    let url = config.url
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
}

export { service }
