import { service } from './service'

import { config } from './config'

const { default_headers } = config

const request = (option) => {
    const { url, method, params, data, headersType, responseType } = option
    return service({
      url: url,
      method,
      params,
      data,
      responseType: responseType,
      headers: {
        'Content-Type': headersType || default_headers
      }
    })
  }
  export default {
    get: (option) => {
      return request({ method: 'get', ...option })
    },
    post: (option) => {
      return request({ method: 'post', ...option })
    },
    delete: (option) => {
      return request({ method: 'delete', ...option })
    },
    put: (option) => {
      return request({ method: 'put', ...option })
    }
  }