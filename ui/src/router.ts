import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const isAuthenticated = () => {
  let auth_provider = localStorage.getItem("auth_provider") || ""
  let access_token = localStorage.getItem("access_token") || ""
  let user_profile = localStorage.getItem("user_profile") || ""
  let id_token = localStorage.getItem("id_token") || ""
  
  console.log(user_profile);
  if (!id_token || id_token==="undefined" || id_token === "null") return false;

  let base64Body = id_token.split('.')[1] || ""
  let bodyString = base64Body.replace(/-/g, '+').replace(/_/g, '/');
  let bodyJsonString = decodeURIComponent(window.atob(bodyString).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  let bodyJson = JSON.parse(bodyJsonString)

  let expired_time = bodyJson.exp;
  console.log(expired_time)

  if(auth_provider==="gAuth"){

  }

  return true;
}
const is2FA = () => {
  return false;
}

const createVueRouter = (app: any) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach(async (to, from, next) => {
    console.log(to)
    console.log(isAuthenticated())
    console.log(is2FA())
    
    if (isAuthenticated() && is2FA() && to.path === "/login") {
      window.location.href = `/main` ;
    }else if (isAuthenticated() && to.path === "/login"){
      window.location.href = `/2fa` ;
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated() && is2FA()) {
            next()
        } else if(isAuthenticated()){
            window.location.href = `/2fa` ;
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