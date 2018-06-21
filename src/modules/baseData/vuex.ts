import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: SystemState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
  //
  pageList(context: ActionContext<SystemState, State>, params: any): Promise<any> {
    return api.pageList(params)
  },
}

export default {state, mutations, actions}
