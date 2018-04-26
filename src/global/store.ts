import Vue from 'vue'
import Vuex from 'vuex'
import { MutationTree, ActionTree, ModuleTree, ActionContext } from 'vuex'
import common from '../modules/common/vuex'
import VuexPersistence from 'vuex-persist'
const vuexPersist = new VuexPersistence({
  strictMode: true,
  storage: localStorage,
})

Vue.use(Vuex)

const state: Store.State = {
  common: {},
}
const mutations: MutationTree<any> = {
  RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
}

const actions: ActionTree<any, any> = {
}

const modules: ModuleTree<any> = {
  common,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins: [vuexPersist.plugin],
})
