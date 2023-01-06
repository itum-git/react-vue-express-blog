import Layout from '@/layout/Layout.vue'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export default router = [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard/analysis',
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
        title: t('router.login'),
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