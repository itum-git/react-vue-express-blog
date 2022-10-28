import request from '@/config/axios'

export const loginApi = (data) => {
  return request.post({ url: '/user/login', data })
}

export const loginOutApi = () => {
  return request.get({ url: '/user/loginOut' })
}

export const getUserListApi = ({ params }) => {
  return request({ url: '/user/list', params })
}

export const getAdminRoleApi = (
  params
) => {
  return request.get({ url: '/role/list', params })
}

export const getTestRoleApi = (params) => {
  return request.get({ url: '/role/list', params })
}
