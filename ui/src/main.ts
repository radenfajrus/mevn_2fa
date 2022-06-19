import { createApp } from 'vue'
import App from './App.vue'
import './style.scss'

import createVueRouter from './router'
import gauth from 'vue3-google-oauth2';


const app = createApp(App)
app.use(createVueRouter(app))
app.use(gauth, {
  clientId: import.meta.env.gauth_client_id,
  scope: 'email',
  prompt: 'consent',
})
app.mount('#app')
