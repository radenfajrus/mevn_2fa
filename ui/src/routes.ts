export default [
  {
    path: '/',
    component: () => import('@/layouts/Unauthenticated.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        meta: {
          requiresAuth: false
        },
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        meta: {
          requiresAuth: false
        },
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/logout',
        name: 'Logout',
        meta: {
          requiresAuth: false
        },
        component: () => import('@/views/Logout.vue'),
      },
      {
        path: '/2fa',
        name: '2fa',
        meta: {
          requiresAuth: false
        },
        component: () => import('@/views/2FA.vue'),
      },
    ]
  },
  {
    path: '/main',
    component: () => import('@/layouts/Authenticated.vue'),
    children: [
      {
        path: '/main',
        name: 'Main',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/views/Main.vue'),
      },
    ]
  },
]