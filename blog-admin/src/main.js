import { setupProdMockServer } from '../mock/_createProductionServer'

// 引入windi css
import '@/plugins/windi.css'

// 导入全局的svg图标
import '@/plugins/svgIcon'

// 引入状态管理
import { setupStore } from './store'
// 路由
import { setupRouter } from './router'

// 引入全局样式
import '@/styles/index.less'

// 全局组件
import { setupGlobCom } from '@/components'

import { createApp } from 'vue'

import App from './App.vue'

import './permission'

// 创建实例
const setupAll = async () => {
    const app = createApp(App)

    setupProdMockServer()

    setupStore(app)

    setupGlobCom(app)

    // setupElementPlus(app)

    setupRouter(app)

    app.mount('#app')
}

setupAll()