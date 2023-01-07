import router, { generateRoutes } from './router'
import { useAppStore } from '@/store/modules/app'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { useUserStore } from './store/modules/user'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const userStore = useUserStore()

const appStore = useAppStore()

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  const userInfo = userStore.getUserInfo
  if (userInfo !== null) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (userStore.isAddRoutes) {
        next()
        return
      }

      // 是否使用动态路由
      if (appStore.getDynamicRouter) {
        generateRoutes(userInfo.permissions)
      } else {
        generateRoutes()
      }

      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      userStore.setIsAddRoutes(true)

      console.log('beforeEach', nextData)
      next(nextData)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach((to) => {
  useTitle(to?.meta?.title)
  done() // 结束Progress
  loadDone()
})
