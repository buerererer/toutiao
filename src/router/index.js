// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/notfound'
import Article from '@/views/article'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [{
      name: 'welcome',
      path: '/',
      component: Welcome
    },
    {
      name: 'article',
      path: '/article',
      component: Article
    }]
  },
  {
    path: '*',
    component: NotFound
  }

  ]
})

// 加上前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('heimatoutiao')
  if (user) return next()
  next('/login')
})

export default router
