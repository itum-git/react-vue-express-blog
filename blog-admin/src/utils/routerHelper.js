import { isUrl } from '@/utils/is'

export const pathResolve = (parentPath, path) => {
    if (isUrl(path)) return path
    const childPath = path.startsWith('/') || !path ? path : `/${path}`
    return `${parentPath}${childPath}`.replace(/\/\//g, '/')
}

export const getRawRoute = (route) => {
    if (!route) return route
    const { matched, ...opt } = route
    return {
      ...opt,
      matched: (matched
        ? matched.map((item) => ({
            meta: item.meta,
            name: item.name,
            path: item.path
          }))
        : undefined)
    }
  }