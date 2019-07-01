import Vue from 'vue'
import Router from 'vue-router'
import common from '../modules/common/router'
import publicRouter from '../modules/public/router'
import MainLayout from '../modules/common/view/MainLayout.vue'
import system from '../modules/system/router'
import baseData from '../modules/baseData/router'
import Page404 from '../modules/common/view/Page404.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes: [
    ...publicRouter,
    {
      path: '/:module?/:name?/:param?',
      component: MainLayout,
    },
    {
      path: '*',
      component: Page404
    }
  ]
})

export const components = [
  ...common,
  ...system,
  ...baseData
]
Vue.prototype.$tab = {
  getComponent (tab) {
    const name = tab.components[tab.components.length - 1]
    const r = components.find(c => c.path === name || c.path !== '' && new RegExp(c.path).test(name))
    return r ? r.component : null
  },
  // 打开新的 tab 页
  open (url, title) {
    const menu = store.getters.flatMenu.find(m => m.url === url)
    store.commit('openTab', {url, title, menu})
  },
  // 根据路由地址跳转到正确的tab页
  toTab (url) {
    store.commit('toTab', url)
  },
  // 关闭tab页
  close (id, url) {
    store.commit('closeTab', {id, url})
  },
  // 在当前tab页里面打开新页面
  push (url) {
    store.commit('tabPush', url)
  },
  // 在当前tab页里面替换当前页面
  replace (url) {
    store.commit('tabReplace', url)
  }
}
// 路由改变的钩子
// router.beforeEach((to, from, next) => {
//   next()
// })
export default router
