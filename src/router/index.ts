import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import Canvas from '../views/user/Canvas.vue'
import UserProfile from '../views/user/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/user',
      name: 'user',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'canvas',
          name: 'canvas',
          component: Canvas,
          meta: { requiresAuth: true }
        },
        {
          path: 'profile',
          name: 'userProfile',
          component: UserProfile,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home'
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  
  // 如果需要登录且未登录，重定向到登录页
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } 
  // 如果已登录且访问登录页，重定向到首页
  else if (isLoggedIn && to.path === '/login') {
    next('/home')
  }
  // 其他情况正常放行
  else {
    next()
  }
})

export default router 