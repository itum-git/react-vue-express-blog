import { createApp } from 'vue'
import App from './App.vue'
// 引入状态管理
import store from '@/store'
// 路由
import router from './router'

const app = createApp(App)

app.use(store)

app.use(router)

app.mount('#app')
