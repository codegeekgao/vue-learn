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
    component: (resolve) => require(['@/views/about'], resolve),
    children: [
      {
        path: '',
        redirect: 'son2'
      },
      {
        path: 'son1',
        meta: {
          title: 'son1'
        },
        component: () => import('@/views/son1')
      },
      {
        path: 'son2',
        meta: {
          title: 'son2'
        },
        component: () => import('@/views/son2')
      }
    ]
  },
  {
    path: '/detail',
    component: resolve => require(['@/views/detail'], resolve),
    meta: {
      title: 'beauty1'
    }
  },
  {
    path: '/beauty1',
    component: (resolve) => require(['@/views/beauty1'], resolve),
    meta: {
      title: 'beauty1'
    }
  },
  {
    path: '/beauty2',
    name: 'Beauty2',
    meta: {
      title: 'Beauty2'
    },
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
// 路由切换前进行调用
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // console.log(to, '----', from)
  next()
})
export default router
