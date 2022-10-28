import request from '@/config/axios'

export const getCountApi = () => {
  return request.get({ url: '/workplace/total' })
}

export const getProjectApi = () => {
  return request.get({ url: '/workplace/project' })
}

export const getDynamicApi = () => {
  return request.get({ url: '/workplace/dynamic' })
}

export const getTeamApi = () => {
  return request.get({ url: '/workplace/team' })
}

export const getRadarApi = () => {
  return request.get({ url: '/workplace/radar' })
}
