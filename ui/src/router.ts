import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


const createVueRouter = (app: any) => {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach(async (to, from, next) => {
    console.log(to)
      if (to.matched.some(record => record.meta.requiresAuth)) {
          // if (is_authenticated) {
              if (to.path === "") {
                  window.location.href = `${window.location.origin}/dashboard` ;
              }
              next()
          // } else {
          //     let url = login({
          //         redirectUri:`${window.location.origin}/dashboard`
          //     })
          //     window.location.href = url
          // }
      } else {
          next()
      }
  })

  return router 
  
}

export default createVueRouter