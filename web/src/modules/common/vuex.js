import { utils } from '../../assets/utils/index'
import router from '../../global/router'
import api from '../../global/api'
import store from '../../global/store'
import Vue from 'vue'
import {Base64} from 'js-base64'

const defaultTabs = [{id: '0', title: '首页', components: ['/'], noClose: true}]
const state = {
  menus: [], // 左侧菜单
  resources: [], // 资源权限
  menuExpand: true, // 左侧菜单是否展开
  menuTabs: [...defaultTabs], // tabs
  selectedTab: '', // 当前激活的tab
  outsideDialog: {}, // 外部dialog弹窗
  insideDialog: {}, // 内部dialog弹窗
  user: {},
  optionsCache: {},
}
const getters = {
  // 打平的菜单，只有一个层级
  flatMenu (state) {
    return utils.flatObject(state.menus)
  },
  // 面包屑导航对象
  nav (state) {
    const item = state.menuTabs.find((item) => item.key === state.selectedTab)
    let menus = []
    if (item) {
      menus = JSON.parse(JSON.stringify(item.menus))
      if (item.url) {
        menus[menus.length - 1].url = item.url
      }
    }
    return menus
  },
  activeMenu (state) {
    if (!state.selectedTab || state.selectedTab === '0') {
      return ''
    }
    const menu = store.getters.flatMenu.find(m => m.url === Base64.decode(state.selectedTab))
    if (menu) {
      return menu.id
    }
    return ''
  },
  // dialog弹窗
  dialog: (state) => (inside) => {
    return inside ? state.insideDialog : state.outsideDialog
  },
}
const mutations = {
  openTab (state, params) {
    const id = params.url === '/' ? '0' : params.id
    const title = params.url === '/' ? '首页' : (params.title || params.menu.name)
    // 先查看是否已经打开
    const isOpen = state.menuTabs.some(t => t.id === id)
    !isOpen && state.menuTabs.push({
      id, title, components: [params.url]
    })
    // 切换到新打开的标签
    store.commit('updateSelectedTab', id)
    // 更新一下url
    // router.push(params.url)
  },
  closeTab (state, params) {
    const index = state.menuTabs.findIndex(t => t.id === params.id)
    const id = state.menuTabs[index].id
    state.menuTabs.splice(index, 1)
    // 如果关闭的是当前tab
    if (id === state.selectedTab) {
      if (params.url) {
        router.push(params.url)
      } else {
        store.commit('updateSelectedTab', state.menuTabs[index - 1].id)
      }
    }
  },
  closeTabs (state, command) {
    const index = state.menuTabs.findIndex((t) => t.id === state.selectedTab)
    if (command === 'noActive') {
      state.menuTabs.splice(index + 1)
      if (index > 0) {
        state.menuTabs.splice(1, index - 1)
      }
    } else if (command === 'all') {
      state.menuTabs = [state.menuTabs[0]]
      store.commit('updateSelectedTab', '0')
    } else if (command === 'left') {
      if (index > 0) {
        state.menuTabs.splice(1, index - 1)
      }
    } else if (command === 'right') {
      state.menuTabs.splice(index + 1)
    }
  },
  refreshTab (state, id) {
    const index = state.menuTabs.findIndex(t => t.id === id)
    const tab = state.menuTabs[index]
    const clone = JSON.parse(JSON.stringify(tab))
    clone.components = []
    state.menuTabs.splice(index, 1, clone)
    Vue.nextTick(() => store.commit('updateMenuTabs', {index, tab}))
  },
  updateMenuTabs (state, params) {
    state.menuTabs.splice(params.index, 1, params.tab)
  },
  updateSelectedTab (state, id) {
    state.selectedTab = id
  },
  // 切换左边菜单的大小
  toggleMenu (state) {
    state.menuExpand = !state.menuExpand
  },
  // 更新Dialog弹窗
  updateDialog (state, dialog) {
    if (state.outsideDialog.visible) {
      state.insideDialog = dialog
    } else {
      state.outsideDialog = dialog
    }
  },
  // 关闭Dialog弹窗
  hideDialog (state) {
    if (state.insideDialog.visible) {
      state.insideDialog = {}
    } else {
      state.outsideDialog = {}
    }
  },
  // 登录后，设置一些用户信息到store
  updateUser (state, data) {
    state.user = data.user
    state.menus = data.auth.menus
    state.resources = data.auth.resources
  },
  // 清除Store里面的用户信息
  clearStore (state) {
    state.menus = []
    state.resources = []
    state.menuTabs = [...defaultTabs]
    state.selectedTab = '0'
    state.user = {}
  }
}

const actions = {
  // 表单的按钮事件，主要是搜索和保存
  formAction (context, params) {
    return api.formAction(params.url, params.params)
  },
  // 获取表单控件的选择项，下拉、单选、多选等
  async getOptions (context, url) {
    const { data } = await api.getOptions(url)
    if (data) {
      return data
    }
    return null
    // 暂时不缓存。等想到好的方案更新缓存再开启
    // if (context.state.optionsCache[url]) {
    //   return context.state.optionsCache[url]
    // } else {
    //   const {data} = await api.getOptions(url)
    //   if (data) {
    //     // 缓存
    //     context.state.optionsCache[url] = data
    //     return data
    //   }
    //   return null
    // }
  },
  async getPageOptions (context, code) {
    const { data } = await api.getPageOptions(code)
    if (data) {
      return JSON.parse(data.value)
    }
  },
  requestUrl (context, params) {
    return api.requestUrl(params.method, params.url, params.params)
  },
  // 获取首页用户仪表盘数据
  getUserDashboard (context) {
    return api.getUserDashboard()
  },
  // 获取首页可用的所有仪表盘
  getAllDashboard (context) {
    return api.getAllDashboard()
  },
  // 保存用户的仪表盘布局
  saveUserDashboard (context, userDashboards) {
    return api.saveUserDashboard({ userDashboards })
  },
  // 获取仪表盘的数据
  getDashboardData (context, params) {
    return api.requestUrl(params.method, params.url, params.params)
  },
}

export default { state, getters, mutations, actions }
