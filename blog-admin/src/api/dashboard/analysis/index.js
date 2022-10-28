import request from '@/config/axios'

export const getCountApi = () => {
  return request.get({ url: '/analysis/total' })
}

export const getUserAccessSourceApi = () => {
  return request.get({ url: '/analysis/userAccessSource' })
}

export const getWeeklyUserActivityApi = () => {
  return request.get({ url: '/analysis/weeklyUserActivity' })
}

export const getMonthlySalesApi = () => {
  return request.get({ url: '/analysis/monthlySales' })
}
