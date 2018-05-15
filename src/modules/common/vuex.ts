import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: CommonState = {
  menus: [],
  menuExpand: true,
  menuTabs: [],
  selectedTab: '',
}
const mutations: MutationTree<any> = {
  updateUser(state: CommonState, menus: Menu[]): void {
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
    // 暂定激活最后一个
    if (key === state.selectedTab) {
      state.selectedTab = state.menuTabs[state.menuTabs.length - 1] ? state.menuTabs[state.menuTabs.length - 1].key : '0'
    }
  },
}


const actions: ActionTree<any, any> = {
  async getMenu(context: ActionContext<CommonState, State>): Promise<any> {
    const {data} = await api.getMenu()
    if (data) {
      context.commit('updateUser', data)
    }
  },
}

export default {state, mutations, actions}
