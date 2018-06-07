import Vue from 'vue'
import Vuex from 'vuex'
import { MutationTree, ActionTree, ModuleTree, ActionContext } from 'vuex'
import common from '../modules/common/vuex'
import publicM from '../modules/public/vuex'
import system from '../modules/system/vuex'
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
  common, publicM, system,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer: (state: State) => ({
      common: {
        menus: state.common.menus,
        menuExpand: state.common.menuExpand,
        menuTabs: state.common.menuTabs,
        selectedTab: state.common.selectedTab,
        user: state.common.user,
      },
      // home: state.home,
    }),
  })],
})
