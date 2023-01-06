import { createRouter, createWebHashHistory, add } from 'vue-router'
import constantRouterMap from './routes'
import { isString, isArray } from '@/utils/is'

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = () => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFound', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const generateRoutes = (config) => {
  const modules = import.meta.glob("./module/*.js", { eager: true })

  function setRoutes(con) {
    const routes = []
    con.forEach(item => {
      if (isString(item)) {
        routes.push(modules[item])
      } else if (isArray(item)) {
        routes = routes.concat(setRoutes(item))
      }
    })
  }

  const routes = setRoutes(config)
  routes.forEach((r) => router.addRoute(r));
}

export const setupRouter = app => {
  app.use(router)
}

export default router
