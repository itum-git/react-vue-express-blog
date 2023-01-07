import { createRouter, createWebHashHistory } from 'vue-router'
import constantRouterMap from './routes'
import { isString, isArray } from '@/utils/is'

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

const default_config = ['dashboard']

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
  const modules = import.meta.glob("./modules/*.js", { import: 'default', eager: true })

  function setRoutes(con) {
    const routes = []
    con.forEach(item => {
      if (isString(item)) {
        const moduleKey = `./modules/${item}.js`
        routes.push(modules[moduleKey])
      } else if (isArray(item)) {
        routes = routes.concat(setRoutes(item))
      }
    })
    return routes
  }

  const routes = setRoutes(config)
  routes.forEach((r) => router.addRoute(r));
}

export const setupRouter = app => {
  app.use(router)
}

export default router
