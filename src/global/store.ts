import Vue from 'vue'
import Vuex from 'vuex'
import { MutationTree, ActionTree, ModuleTree, ActionContext } from 'vuex'
import common from '../modules/common/vuex'
import publicM from '../modules/public/vuex'
import system from '../modules/system/vuex'
import VuexPersistence from 'vuex-persist'
const vuexPersist = new VuexPersistence({
  strictMode: true,
  storage: sessionStorage,
  reducer: (state: State) => ({
    common: {
      menus: state.common.menus,
      menuExpand: state.common.menuExpand,
      menuTabs: state.common.menuTabs,
      selectedTab: state.common.selectedTab,
    },
    // home: state.home,
  }),
})

Vue.use(Vuex)

const state: State = {
  common: {},
  publicM: {},
  system: {},
}
const mutations: MutationTree<any> = {
  RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
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
  plugins: [vuexPersist.plugin],
})
