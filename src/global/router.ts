import Vue from 'vue'
import Router from 'vue-router'
import common from '../modules/common/router'
import publicRouter from '../modules/public/router'
import MainLayout from '../modules/common/view/MainLayout.vue'
import system from '../modules/system/router'
import demo from '../modules/demo/router'

Vue.use(Router)

const router = new Router({
  routes: [
    ...publicRouter,
    {
      path: '/',
      component: MainLayout,
      children: [
        ...common,
        ...system,
        ...demo,
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
// 路由改变的钩子
// router.beforeEach((to, from, next) => {
//   next()
// })
export default router
