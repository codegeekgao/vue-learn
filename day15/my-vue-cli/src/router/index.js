// import vue-router

import VueRouter from 'vue-router'
import Vue from 'vue'
// use plugin
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/about',
    component: (resolve) => require(['@/views/about'], resolve)
  },
  {
    path: '/detail',
    component: resolve => require(['@/views/detail'], resolve)
  },
  {
    path: '/beauty1',
    component: (resolve) => require(['@/views/beauty1'], resolve)
  },
  {
    path: '/beauty2',
    component: () => import('@/views/beauty2')
  },
  {
    path: '/active/:name',
    component: resolve => require(['@/views/active'], resolve)
  }
]
// create VueRouter object
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
