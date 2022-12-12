import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: 'router.login',
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFound',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: 'router.dashboard',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: '/analysis',
        component: () => import('@/views/Dashboard/Analysis.vue'),
        name: 'Analysis',
        meta: {
          title: 'router.analysis',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'workplace',
        component: () => import('@/views/Dashboard/Workplace.vue'),
        name: 'Workplace',
        meta: {
          title: 'router.workplace',
          noCache: true
        }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/example-dialog',
  //   name: 'Example',
  //   meta: {
  //     title: 'router.example',
  //     icon: 'ep:management',
  //     alwaysShow: true
  //   },
  //   children: [
  //     {
  //       path: 'example-dialog',
  //       component: () => import('@/views/Example/Dialog/ExampleDialog.vue'),
  //       name: 'ExampleDialog',
  //       meta: {
  //         title: 'router.exampleDialog'
  //       }
  //     },
  //     {
  //       path: 'example-page',
  //       component: () => import('@/views/Example/Page/ExamplePage.vue'),
  //       name: 'ExamplePage',
  //       meta: {
  //         title: 'router.examplePage'
  //       }
  //     },
  //     {
  //       path: 'example-add',
  //       component: () => import('@/views/Example/Page/ExampleAdd.vue'),
  //       name: 'ExampleAdd',
  //       meta: {
  //         title: 'router.exampleAdd',
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     },
  //     {
  //       path: 'example-edit',
  //       component: () => import('@/views/Example/Page/ExampleEdit.vue'),
  //       name: 'ExampleEdit',
  //       meta: {
  //         title: 'router.exampleEdit',
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     },
  //     {
  //       path: 'example-detail',
  //       component: () => import('@/views/Example/Page/ExampleDetail.vue'),
  //       name: 'ExampleDetail',
  //       meta: {
  //         title: 'router.exampleDetail',
  //         noTagsView: true,
  //         noCache: true,
  //         hidden: true,
  //         canTo: true,
  //         activeMenu: '/example/example-page'
  //       }
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = () => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = app => {
  app.use(router)
}

export default router
