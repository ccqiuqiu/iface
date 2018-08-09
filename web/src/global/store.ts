import Vue from 'vue'
import Vuex from 'vuex'
import { MutationTree, ActionTree, ModuleTree } from 'vuex'
import common from '../modules/common/vuex'
import publicM from '../modules/public/vuex'
import system from '../modules/system/vuex'
import baseData from '../modules/baseData/vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state: State = {
  common: {},
  publicM: {},
  system: {},
  loading: false,
}
const mutations: MutationTree<any> = {
  // 显示loading
  showLoading(state: State): void {
    state.loading = true
  },
  // 隐藏loading
  hideLoading(state: State): void {
    state.loading = true
  },
}

const actions: ActionTree<any, any> = {
}

const modules: ModuleTree<any> = {
  common, publicM, system, baseData,
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer: (state: State) => ({
      common: {
        menus: state.common.menus,
        resources: state.common.resources,
        menuExpand: state.common.menuExpand,
        menuTabs: state.common.menuTabs,
        selectedTab: state.common.selectedTab,
        user: state.common.user,
        noMenuTabsMap: state.common.noMenuTabsMap,
      },
      // home: state.home,
    }),
  })],
})
