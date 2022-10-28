import request from '@/config/axios'

export const getTableListApi = (params) => {
  return request.get({ url: '/example/list', params })
}

export const saveTableApi = (data) => {
  return request.post({ url: '/example/save', data })
}

export const getTableDetApi = (id) => {
  return request.get({ url: '/example/detail', params: { id } })
}

export const delTableListApi = (ids) => {
  return request.post({ url: '/example/delete', data: { ids } })
}
