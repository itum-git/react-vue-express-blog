import { defineStore } from 'pinia'
import { store } from '../index'
import { setCssVar, humpToUnderline } from '@/utils'
import { ElMessage } from 'element-plus'
import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
      sizeMap: ['default', 'large', 'small'],
      mobile: false, // 是否是移动端
      title: import.meta.env.VITE_APP_TITLE, // 标题
      pageLoading: false, // 路由跳转loading

      breadcrumb: true, // 面包屑
      breadcrumbIcon: true, // 面包屑图标
      collapse: false, // 折叠菜单
      uniqueOpened: false, // 是否只保持一个子菜单的展开
      hamburger: true, // 折叠图标
      screenfull: true, // 全屏图标
      size: true, // 尺寸图标
      locale: true, // 多语言图标
      tagsView: true, // 标签页
      tagsViewIcon: true, // 是否显示标签图标
      logo: true, // logo
      fixedHeader: true, // 固定toolheader
      footer: true, // 显示页脚
      greyMode: false, // 是否开始灰色模式，用于特殊悼念日
      dynamicRouter: wsCache.get('dynamicRouter') || false, // 是否动态路由
      fixedMenu: wsCache.get('fixedMenu') || false, // 是否固定菜单

      layout: wsCache.get('layout') || 'classic', // layout布局
      isDark: wsCache.get('isDark') || false, // 是否是暗黑模式
      currentSize: wsCache.get('default') || 'default', // 组件尺寸
      theme: wsCache.get('theme') || {
        // 主题色
        elColorPrimary: '#409eff',
        // 左侧菜单边框颜色
        leftMenuBorderColor: 'inherit',
        // 左侧菜单背景颜色
        leftMenuBgColor: '#001529',
        // 左侧菜单浅色背景颜色
        leftMenuBgLightColor: '#0f2438',
        // 左侧菜单选中背景颜色
        leftMenuBgActiveColor: 'var(--el-color-primary)',
        // 左侧菜单收起选中背景颜色
        leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
        // 左侧菜单字体颜色
        leftMenuTextColor: '#bfcbd9',
        // 左侧菜单选中字体颜色
        leftMenuTextActiveColor: '#fff',
        // logo字体颜色
        logoTitleTextColor: '#fff',
        // logo边框颜色
        logoBorderColor: 'inherit',
        // 头部背景颜色
        topHeaderBgColor: '#fff',
        // 头部字体颜色
        topHeaderTextColor: 'inherit',
        // 头部悬停颜色
        topHeaderHoverColor: '#f6f6f6',
        // 头部边框颜色
        topToolBorderColor: '#eee'
      }
    }
  },
  getters: {
    getBreadcrumb() {
      return this.breadcrumb
    },
    getBreadcrumbIcon() {
      return this.breadcrumbIcon
    },
    getCollapse() {
      return this.collapse
    },
    getUniqueOpened() {
      return this.uniqueOpened
    },
    getHamburger() {
      return this.hamburger
    },
    getScreenfull() {
      return this.screenfull
    },
    getSize() {
      return this.size
    },
    getLocale() {
      return this.locale
    },
    getTagsView() {
      return this.tagsView
    },
    getTagsViewIcon() {
      return this.tagsViewIcon
    },
    getLogo() {
      return this.logo
    },
    getFixedHeader() {
      return this.fixedHeader
    },
    getGreyMode() {
      return this.greyMode
    },
    getDynamicRouter() {
      return this.dynamicRouter
    },
    getFixedMenu() {
      return this.fixedMenu
    },
    getPageLoading() {
      return this.pageLoading
    },
    getLayout() {
      return this.layout
    },
    getTitle() {
      return this.title
    },
    getUserInfo() {
      return this.userInfo
    },
    getIsDark() {
      return this.isDark
    },
    getCurrentSize() {
      return this.currentSize
    },
    getSizeMap() {
      return this.sizeMap
    },
    getMobile() {
      return this.mobile
    },
    getTheme() {
      return this.theme
    },
    getFooter() {
      return this.footer
    }
  },
  actions: {
    setBreadcrumb(breadcrumb) {
      this.breadcrumb = breadcrumb
    },
    setBreadcrumbIcon(breadcrumbIcon) {
      this.breadcrumbIcon = breadcrumbIcon
    },
    setCollapse(collapse) {
      this.collapse = collapse
    },
    setUniqueOpened(uniqueOpened) {
      this.uniqueOpened = uniqueOpened
    },
    setHamburger(hamburger) {
      this.hamburger = hamburger
    },
    setScreenfull(screenfull) {
      this.screenfull = screenfull
    },
    setSize(size) {
      this.size = size
    },
    setLocale(locale) {
      this.locale = locale
    },
    setTagsView(tagsView) {
      this.tagsView = tagsView
    },
    setTagsViewIcon(tagsViewIcon) {
      this.tagsViewIcon = tagsViewIcon
    },
    setLogo(logo) {
      this.logo = logo
    },
    setFixedHeader(fixedHeader) {
      this.fixedHeader = fixedHeader
    },
    setGreyMode(greyMode) {
      this.greyMode = greyMode
    },
    setDynamicRouter(dynamicRouter) {
      wsCache.set('dynamicRouter', dynamicRouter)
      this.dynamicRouter = dynamicRouter
    },
    setFixedMenu(fixedMenu) {
      wsCache.set('fixedMenu', fixedMenu)
      this.fixedMenu = fixedMenu
    },
    setPageLoading(pageLoading) {
      this.pageLoading = pageLoading
    },
    setLayout(layout) {
      if (this.mobile && layout !== 'classic') {
        ElMessage.warning('移动端模式下不支持切换其他布局')
        return
      }
      this.layout = layout
      wsCache.set('layout', this.layout)
    },
    setTitle(title) {
      this.title = title
    },
    setIsDark(isDark) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      wsCache.set('isDark', this.isDark)
    },
    setCurrentSize(currentSize) {
      this.currentSize = currentSize
      wsCache.set('currentSize', this.currentSize)
    },
    setMobile(mobile) {
      this.mobile = mobile
    },
    setTheme(theme) {
      this.theme = Object.assign(this.theme, theme)
      wsCache.set('theme', this.theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(`--${humpToUnderline(key)}`, this.theme[key])
      }
    },
    setFooter(footer) {
      this.footer = footer
    }
  }
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
