import { MutationTree, ActionTree, ActionContext, GetterTree } from 'vuex'
import * as utils from '@utils/utils'

const state: CommonState = {
  menus: [], // 左侧菜单
  menuExpand: true, // 左侧菜单是否展开
  menuTabs: [{key: '0', menus: [{id: '0', name: '首页', url: '/', noClose: true}]}], // tabs
  selectedTab: '0', // 当前激活的tab
  outsideDialog: {}, // 外部dialog弹窗
  insideDialog: {}, // 内部dialog弹窗
  user: {},
}
const getters: GetterTree<any, any> = {
  // 面包屑导航对象
  nav(state: CommonState): Menu[] {
    const item = state.menuTabs.find((item: any) => item.key === state.selectedTab)
    return item ? item.menus : []
  },
  // dialog弹窗
  dialog: (state: CommonState) => (inside: boolean) => {
    return inside ? state.insideDialog : state.outsideDialog
  },
  // 打平的菜单，只有一个层级
  flatMenu(state: CommonState): Menu[] {
    return utils.flatObject(state.menus as Menu[])
  },
}
const mutations: MutationTree<any> = {
  // 切换左边菜单的大小
  toggleMenu(state: CommonState): void {
    state.menuExpand = !state.menuExpand
  },
  // 更新tab页
  updateTabs(state: CommonState, params: {key: string, menus: Menu[]}): void {
    if (params.key) {
      state.menuTabs.push(params)
    }
  },
  // 更新当前选择的tab
  updateSelectedTab(state: CommonState, key: string): void {
     if (key) {
       state.selectedTab = key
     }
  },
  // 关闭tab
  removeTab(state: CommonState, key: string): void {
    // 从menuTabs里面删除tab
    const index = state.menuTabs.findIndex((o: any) => o.key === key)
    if (index >= 0) {
      state.menuTabs.splice(index, 1)
    }
    // 如果删除的是当前激活的，要重新激活一个标签
    // 暂定激活前一个
    if (key === state.selectedTab) {
      state.selectedTab = state.menuTabs[index - 1].key
    }
  },
  // 更新Dialog弹窗
  updateDialog(state: CommonState, params: any): void {
    if (params.inside) {
      state.insideDialog = params.dialog
    } else {
      state.outsideDialog = params.dialog
    }
  },
  // 登录后，设置一些用户信息到store
  updateUser(state: CommonState, data: any): void {
    state.user = data.user
    state.menus = data.auth.menus
  },
  // 清除Store里面的用户信息
  clearStore(state: CommonState): void {
    state.menus = []
    state.menuTabs = [{key: '0', menus: [{id: '0', name: '首页', url: '/', noClose: true}]}]
    state.selectedTab = ''
    state.user = {}
  },
}


const actions: ActionTree<any, any> = {
}

export default {state, getters, mutations, actions}
