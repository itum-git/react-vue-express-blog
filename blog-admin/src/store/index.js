
import { createPinia } from 'pinia'

export const store = createPinia()

export const setupStore = app => {
    app.use(store)
}

