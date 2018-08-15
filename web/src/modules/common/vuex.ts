import {MutationTree, ActionTree, ActionContext, GetterTree} from 'vuex'
import {utils} from '@utils/index'
import router from '@g/router'
import api from '@g/api'

const defaultTabs = [{key: '0', url: '/', menus: [{id: '0', name: '首页', url: '/', noClose: true}]}]
const state: CommonState = {
  menus: [], // 左侧菜单
  resources: [], // 资源权限
  menuExpand: true, // 左侧菜单是否展开
  menuTabs: defaultTabs, // tabs
  selectedTab: '0', // 当前激活的tab
  outsideDialog: {}, // 外部dialog弹窗
  insideDialog: {}, // 内部dialog弹窗
  user: {},
  optionsCache: {},
  noMenuTabsMap: {}, // 非menu的tab
}
const getters: GetterTree<any, any> = {
  // 面包屑导航对象
  nav(state: CommonState): Menu[] {
    const item = state.menuTabs.find((item: any) => item.key === state.selectedTab)
    let menus: Menu[] = []
    if (item) {
      menus = JSON.parse(JSON.stringify(item.menus))
      if (item.url) {
        menus[menus.length - 1].url = item.url
      }
    }
    return menus
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
  updateTabs(state: CommonState, params: { key: string, menus: Menu[] }): void {
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
  // 更新当前选择的tab的url
  updateTabUrl(state: CommonState, {item, url}): void {
    item.url = url
  },
  // 关闭tab
  removeTab(state: CommonState, key?: string): void {
    if (!key) {
      key = state.selectedTab
    }
    // 从menuTabs里面删除tab
    const index = state.menuTabs.findIndex((o: any) => o.key === key)
    if (index >= 0) {
      state.menuTabs.splice(index, 1)
    }
    delete state.noMenuTabsMap[key!]
    // 如果删除的是当前激活的，要重新激活一个标签
    // 暂定激活下一个
    if (key === state.selectedTab) {
      const newIndex = state.menuTabs[index] ? index : index - 1
      // state.selectedTab = state.menuTabs[newIndex].key
      // 跳转url
      router.push(state.menuTabs[newIndex].url)
    }
  },
  closeTab(state: CommonState, command: string): void {
    const index = state.menuTabs.findIndex((tab: any) => tab.key === state.selectedTab)
    if (command === 'noActive') {
      state.menuTabs.splice(index + 1)
      if (index > 0) {
        state.menuTabs.splice(1, index - 1)
      }
    } else if (command === 'all') {
      state.menuTabs = [state.menuTabs[0]]
      router.push('/')
    } else if (command === 'left') {
      if (index > 0) {
        state.menuTabs.splice(1, index - 1)
      }
    } else if (command === 'right') {
      state.menuTabs.splice(index + 1)
    }
  },
  // 更新Dialog弹窗
  updateDialog(state: CommonState, dialog: any): void {
    if (state.outsideDialog.visible) {
      state.insideDialog = dialog
    } else {
      state.outsideDialog = dialog
    }
  },
  // 关闭Dialog弹窗
  hideDialog(state: CommonState): void {
    if (state.insideDialog.visible) {
      state.insideDialog = {}
    } else {
      state.outsideDialog = {}
    }
  },
  // 登录后，设置一些用户信息到store
  updateUser(state: CommonState, data: any): void {
    state.user = data.user
    state.menus = data.auth.menus
    state.resources = data.auth.resources
  },
  // 清除Store里面的用户信息
  clearStore(state: CommonState): void {
    state.menus = []
    state.resources = []
    state.menuTabs = defaultTabs
    state.selectedTab = '0'
    state.noMenuTabsMap = {}
    state.user = {}
  },
}

const actions: ActionTree<any, any> = {
  // 表单的按钮事件，主要是搜索和保存
  formAction(context: ActionContext<CommonState, State>, params: { url: string, params: any }): Promise<ActionReturn> {
    return api.formAction(params.url, params.params)
  },
  // 获取表单控件的选择项，下拉、单选、多选等
  async getOptions(context: ActionContext<CommonState, State>, url: string): Promise<any> {
    const {data} = await api.getOptions(url)
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
  async getPageOptions(context: ActionContext<SystemState, State>, code: string): Promise<any> {
    const {data} = await api.getPageOptions(code)
    if (data) {
      return JSON.parse(data.value)
    }
  },
  async requestUrl(context: ActionContext<SystemState, State>, url: string): Promise<any> {
    const {data} = await api.requestUrl(url)
    if (data) {
      return data
    }
  },
  formRequest(context: ActionContext<SystemState, State>, url: string): Promise<ActionReturn> {
    return api.formRequest(url)
  },
  // 获取首页用户仪表盘数据
  getUserDashboard(context: ActionContext<SystemState, State>): Promise<ActionReturn> {
    return api.getUserDashboard()
  },
  // 获取首页可用的所有仪表盘
  getAllDashboard(context: ActionContext<SystemState, State>): Promise<ActionReturn> {
    return api.getAllDashboard()
  },
  // 保存用户的仪表盘布局
  saveUserDashboard(context: ActionContext<SystemState, State>, userDashboards: UserDashboard[]): Promise<ActionReturn> {
    return api.saveUserDashboard({userDashboards})
  },
  // 获取仪表盘的数据
  getDashboardData(context: ActionContext<SystemState, State>, params: any): Promise<ActionReturn> {
    return api.requestUrl(params.url, params.params)
  },
}

export default {state, getters, mutations, actions}
