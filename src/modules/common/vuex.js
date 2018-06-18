import * as utils from '@utils/utils'
import api from '@g/api'

const state = {
  menus: [], // 左侧菜单
  resources: [], // 资源权限
  menuExpand: true, // 左侧菜单是否展开
  menuTabs: [{key: '0', menus: [{id: '0', name: '首页', url: '/', noClose: true}]}], // tabs
  selectedTab: '0', // 当前激活的tab
  outsideDialog: {}, // 外部dialog弹窗
  insideDialog: {}, // 内部dialog弹窗
  user: {},
  optionsCache: {}
}
const getters = {
  // 面包屑导航对象
  nav (state) {
    const item = state.menuTabs.find((item) => item.key === state.selectedTab)
    return item ? item.menus : []
  },
  // dialog弹窗
  dialog: (state) => (inside) => {
    return inside ? state.insideDialog : state.outsideDialog
  },
  // 打平的菜单，只有一个层级
  flatMenu (state) {
    return utils.flatObject(state.menus)
  }
}
const mutations = {
  // 切换左边菜单的大小
  toggleMenu (state) {
    state.menuExpand = !state.menuExpand
  },
  // 更新tab页
  updateTabs (state, params) {
    if (params.key) {
      state.menuTabs.push(params)
    }
  },
  // 更新当前选择的tab
  updateSelectedTab (state, key) {
    if (key) {
      state.selectedTab = key
    }
  },
  // 关闭tab
  removeTab (state, key) {
    // 从menuTabs里面删除tab
    const index = state.menuTabs.findIndex((o) => o.key === key)
    if (index >= 0) {
      state.menuTabs.splice(index, 1)
    }
    // 如果删除的是当前激活的，要重新激活一个标签
    // 暂定激活下一个
    if (key === state.selectedTab) {
      const newIndex = state.menuTabs[index] ? index : index - 1
      state.selectedTab = state.menuTabs[newIndex].key
    }
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
    state.menuTabs = [{key: '0', menus: [{id: '0', name: '首页', url: '/', noClose: true}]}]
    state.selectedTab = ''
    state.user = {}
  }
}

const actions = {
  // 获取crud的json数据
  getCrud (context, id) {
    return api.getCrud(id)
  },
  // 表单的按钮事件，主要是搜索和保存
  formAction (context, params) {
    return api.formAction(params.url, params.params)
  },
  // 获取表单控件的选择项，下拉、单选、多选等
  async getOptions (context, url) {
    if (context.state.optionsCache[url]) {
      return context.state.optionsCache[url]
    } else {
      const {data} = await api.getOptions(url)
      if (data) {
        // 缓存
        context.state.optionsCache[url] = data
        return data
      }
      return null
    }
  },
  requestUrl (context, url) {
    return api.requestUrl(url)
  }
}

export default {state, getters, mutations, actions}
