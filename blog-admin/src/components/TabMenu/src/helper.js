import { getAllParentPath } from '@/components/Menu/src/helper'
import { isUrl } from '@/utils/is'
import { cloneDeep } from 'lodash-es'
import { reactive } from 'vue'

export const tabPathMap = reactive({})

export const initTabMap = (routes) => {
  for (const v of routes) {
    const meta = (v.meta ?? {})
    if (!meta?.hidden) {
      tabPathMap[v.path] = []
    }
  }
}

export const filterMenusPath = (
  routes,
  allRoutes
) => {
  const res = []
  for (const v of routes) {
    let data = null
    const meta = (v.meta ?? {})
    if (!meta.hidden || meta.canTo) {
      const allParentPath = getAllParentPath(allRoutes, v.path)

      const fullPath = isUrl(v.path) ? v.path : allParentPath.join('/')

      data = cloneDeep(v)
      data.path = fullPath
      if (v.children && data) {
        data.children = filterMenusPath(v.children, allRoutes)
      }

      if (data) {
        res.push(data)
      }

      if (allParentPath.length && Reflect.has(tabPathMap, allParentPath[0])) {
        tabPathMap[allParentPath[0]].push(fullPath)
      }
    }
  }

  return res
}
