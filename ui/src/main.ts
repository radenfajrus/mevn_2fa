import { createApp } from 'vue'
import App from './App.vue'
import createVueRouter from './router'

const app = createApp(App)
app.use(createVueRouter(app))
app.mount('#app')
