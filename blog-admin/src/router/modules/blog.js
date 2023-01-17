// import Layout from '@/layout/Layout.vue'
import { useI18n } from '@/hooks/web/useI18n'

// const { t } = useI18n()

const router = {
  path: '/blog',
  component: Layout,
  redirect: '/blog/article',
  name: 'Blog',
  meta: {
    title: 'router.blog',
    icon: 'ep:management',
    alwaysShow: true
  },
  children: [
    {
      path: 'article',
      component: () => import('@/views/BlogViews/Article.vue'),
      name: 'Article',
      meta: {
        title: 'router.article'
      }
    },
    {
      path: 'article-type',
      component: () => import('@/views/BlogViews/ArticleType.vue'),
      name: 'ArticleType',
      meta: {
        title: 'router.articleType'
      }
    },
  ]
}

export default router