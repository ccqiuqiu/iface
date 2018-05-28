import { MutationTree, ActionTree, ActionContext, GetterTree } from 'vuex'
import api from '../../global/api'
import * as utils from '@utils/utils'

const state: CommonState = {
  menus: [],
  menuExpand: true,
  menuTabs: [{key: '0', menus: [{id: '0', name: '首页', url: '/', noClose: true}]}],
  selectedTab: '0',
  outsideDialog: {},
  insideDialog: {},
}
const getters: GetterTree<any, any> = {
  nav(state: CommonState): Menu[] {
    const item = state.menuTabs.find((item: any) => item.key === state.selectedTab)
    return item ? item.menus : []
    // if (item) {
    //   return item.menus
    // }
    // return [{id: '0', name: '首页', url: '/'}]
  },
  dialog: (state: CommonState) => (inside: boolean) => {
    return inside ? state.insideDialog : state.outsideDialog
  },
  flatMenu(state: CommonState): Menu[] {
    return utils.flatObject(state.menus as Menu[])
  },
}
const mutations: MutationTree<any> = {
  updateMenus(state: CommonState, menus: Menu[]): void {
    state.menus = menus
  },
  toggleMenu(state: CommonState): void {
    state.menuExpand = !state.menuExpand
  },
  updateTabs(state: CommonState, params: {key: string, menus: Menu[]}): void {
    state.menuTabs.push(params)
  },
  updateSelectedTab(state: CommonState, key: string): void {
    state.selectedTab = key
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
  updateDialog(state: CommonState, params: any): void {
    if (params.inside) {
      state.insideDialog = params.dialog
    } else {
      state.outsideDialog = params.dialog
    }
  },
  clearStore(state: CommonState): void {
    state.menus = []
    state.menuTabs = [{key: '0', menus: [{id: '0', name: '首页', url: '/', noClose: true}]}]
    state.selectedTab = '0'


  },
}


const actions: ActionTree<any, any> = {
  async getAuth(context: ActionContext<CommonState, State>): Promise<any> {
    const {data} = await api.getAuth()
    if (data) {
      context.commit('updateMenus', data.menus)
    }
  },
}

export default {state, getters, mutations, actions}
