import { utils } from '../../assets/utils/index'
// import router from '../../global/router'
import api from '../../global/api'
import {Base64} from 'js-base64'

const defaultTabs = [{id: '0', title: '首页', components: [''], noClose: true}]
const state = {
  menus: [], // 左侧菜单
  resources: [], // 资源权限
  menuExpand: true, // 左侧菜单是否展开
  menuTabs: [...defaultTabs], // tabs
  selectedTab: '0', // 当前激活的tab
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
  // dialog弹窗
  dialog: (state) => (inside) => {
    return inside ? state.insideDialog : state.outsideDialog
  },
}
const mutations = {
  openTab (state, params) {
    debugger
    const title = params.title || params.menu.name
    const id = Base64.encode(params.url)
    state.menuTabs.push({
      id, title, components: [params.url]
    })
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
  }
}

export default { state, getters, mutations, actions }
