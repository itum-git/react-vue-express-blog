import { pathResolve } from '@/utils/routerHelper'

export const filterAffixTags = (routes, parentPath = '') => {
  let tags = []
  routes.forEach((route) => {
    const meta = route.meta
    const tagPath = pathResolve(parentPath, route.path)
    if (meta?.affix) {
      tags.push({ ...route, path: tagPath, fullPath: tagPath })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, tagPath)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })

  return tags
}
