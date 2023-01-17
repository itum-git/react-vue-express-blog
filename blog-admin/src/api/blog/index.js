import request from '@/config/axios'

export const getBlogListApi = (params) => {
  return request.get({ url: '/blog/list', params })
}

export const setBlogApi = (data) => {
  return request.post({ url: '/blog', data })
}

export const putBlogApi = (data) => {
  return request.put({ url: '/blog', data })
}

export const getBlogApi = (id) => {
  return request.get({ url: '/blog', params: { id } })
}

export const delBlogApi = (ids) => {
  return request.delete({ url: '/blog', data: { ids } })
}

export const getBlogTypeApi = () => {
  return request.get({ url: '/blog/type' })
}

export const setBlogTypeApi = (data) => {
  return request.post({ url: '/blog/type', data })
}

export const putBlogTypeApi = (data) => {
  return request.put({ url: '/blog/type', data })
}

export const delBlogTypeApi = (ids) => {
  return request.delete({ url: '/blog/type', data: { ids } })
}