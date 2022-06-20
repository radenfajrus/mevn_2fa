import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style.scss'
import createVueRouter from './router'
import gAuth from './services/gauth'

const app = createApp(App)
app.use(createVueRouter(app))
app.use(gAuth, {
  client_id: import.meta.env.VITE_GAUTH_CLIENT_ID,
  scope: 'profile email',
  prompt: 'consent',
  ux_mode: 'popup',
})
app.mount('#app')
