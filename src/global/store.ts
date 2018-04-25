import Vue from 'vue'
import Vuex from 'vuex'
import { MutationTree, ActionTree, ModuleTree, ActionContext } from 'vuex'
import common from '../modules/common/vuex'

Vue.use(Vuex)

const state: State = {
  common: {},
}
const mutations: MutationTree<any> = {
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
})
