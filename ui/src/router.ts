import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const isAuthenticated = () => {
  let auth_provider = localStorage.getItem("auth_provider")
  let access_token = localStorage.getItem("access_token")
  let user_profile = localStorage.getItem("user_profile")
  if(auth_provider==="gAuth"){

  }

  return (access_token)?true:false;
}

const createVueRouter = (app: any) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach(async (to, from, next) => {
    console.log(to)
    console.log(isAuthenticated())
    
    if (isAuthenticated() && to.path === "/login") {
      window.location.href = `/main` ;
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated()) {
            next()
        } else {
            window.location.href = `/logout#redirect_uri=${encodeURIComponent(window.location.href)}`
        }
    } else {
        next()
    }
  })

  return router 
  
}

export default createVueRouter