// import vue-router

import VueRouter from 'vue-router'
import Vue from 'vue'
// use plugin
Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    component: (resolve) => require(['@/views/about'], resolve)
  },
  {
    path: '/detail',
    component: resolve => require(['@/views/detail'], resolve)
  }
]
// create VueRouter object
const router = new VueRouter({
  routes
})
export default router
