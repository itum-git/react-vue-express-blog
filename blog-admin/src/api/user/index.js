import request from '@/config/axios'

export const loginApi = (data) => {
  return request.post({ url: '/user/login', data })
}

export const loginOutApi = () => {
  return request.get({ url: '/user/loginOut' })
}

export const getUserInfoApi = () => {
  return request({ url: '/user/info' })
}
