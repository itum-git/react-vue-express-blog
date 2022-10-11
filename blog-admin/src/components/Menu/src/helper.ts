// import type { RouteMeta } from 'vue-router'
import { ref, unref } from 'vue'
import { findPath } from '@/utils/tree'


export const getAllParentPath = (treeData, path) => {
  const menuList = findPath(treeData, (n) => n.path === path)
  return (menuList || []).map((item) => item.path)
}

export const hasOneShowingChild = (
  children = [],
  parent
) => {
  const onlyOneChild = ref()

  const showingChildren = children.filter((v) => {
    const meta = (v.meta ?? {})
    if (meta.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = v
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return {
      oneShowingChild: true,
      onlyOneChild: unref(onlyOneChild)
    }
  }

  // Show parent if there are no child router to display
  if (!showingChildren.length) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return {
      oneShowingChild: true,
      onlyOneChild: unref(onlyOneChild)
    }
  }

  return {
    oneShowingChild: false,
    onlyOneChild: unref(onlyOneChild)
  }
}
