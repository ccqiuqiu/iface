import Vue from 'vue'
import Router from 'vue-router'
import common from '../modules/common/router'
import publicRouter from '../modules/public/router'
import MainLayout from '../modules/common/view/MainLayout.vue'
import system from '../modules/system/router'
import baseData from '../modules/baseData/router'
import Page404 from '../modules/common/view/Page404.vue'
import store from './store'
import utils from '../assets/utils/uiUtils'
import {Base64} from 'js-base64'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes: [
    ...publicRouter,
    {
      path: '/:module?/:name?/:p1?',
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
/**
 * tab页相关的方法，项目的tab页统一通过这些方法管理
 * 路由的改变仅仅为了用户能从浏览器看出当前页的地址
 *
 */
Vue.prototype.$tab = {
  getTabId (url, ignoreQuery = false) {
    if (ignoreQuery) {
      url = url.replace(/(.*)?\?.*/, '$1')
    }
    return Base64.encode(url)
  },
  getComponent (tab) {
    const name = tab.components[tab.components.length - 1]
    const r = components.find(c => c.path === name || c.path !== '/' && new RegExp(c.path).test(name))
    return r ? r.component : null
  },
  // 打开新的 tab 页
  open (url, title, ignoreQuery) {
    const id = this.getTabId(url, ignoreQuery)
    const menu = store.getters.flatMenu.find(m => m.url === url)
    store.commit('openTab', {url, title, menu, id})
    // 如果忽略query，需要发送刷新事件通知目标页面。
    if (ignoreQuery) {
      utils.bus.$emit('refresh-' + id)
    }
  },
  // 根据路由地址跳转到正确的tab页, 一般用于浏览器地址直接输入网址
  toTab (url) {
    const id = this.getTabId(url)
    let tab = store.state.common.menuTabs.find(t => t.id === id)
    if (!tab) {
      const ignoreQueryId = this.getTabId(url, true)
      tab = store.state.common.menuTabs.find(t => t.id === ignoreQueryId)
    }
    if (tab) {
      // 如果当前tab已经打开，那么直接定位到tab
      store.commit('updateSelectedTab', tab.id)
    } else {
      // 当前页没有打开，走open逻辑
      this.open(url)
    }
  },
  // 关闭当前tab页
  closeTab (id, url) {
    store.commit('closeTab', {id, url})
  },
  // 关闭tab页
  close (url, refreshTab) {
    this.closeTab(store.state.common.selectedTab, url)
    utils.bus.$emit('refresh-' + this.getTabId(url), refreshTab)
  },
  // 关闭tab页
  closeTabs (command) {
    store.commit('closeTabs', command)
  },
  // 刷新tab页
  refresh (id = store.state.common.selectedTab) {
    store.commit('refreshTab', id)
  },
  // 在当前tab页里面打开新页面
  push (url) {
    store.commit('tabPush', url)
  },
  // 在当前tab页里面替换当前页面
  replace (url) {
    store.commit('tabReplace', url)
  },
  getCurUrl (id) {
    const tab = store.state.common.menuTabs.find(t => t.id === id)
    if (!tab) return ''
    return tab.components[tab.components.length - 1]
  },
  getParams (id) {
    const url = this.getCurUrl(id).replace(/(.*)?\?.*/, '$1')
    const arr = url.split('/')
    return {
      module: arr[1] || '',
      name: arr[2] || '',
      p1: arr[3] || ''
    }
  },
  getQuery (id) {
    return utils.url2Obj(this.getCurUrl(id))
  }
}
// 路由改变的钩子
// router.beforeEach((to, from, next) => {
//   next()
// })
export default router
