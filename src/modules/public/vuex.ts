import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: Store.PublicState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
   login(context: ActionContext<Store.CommonState, Store.State>, user: Store.User): Promise<any> {
     return api.login(user)
  },
}

export default {state, mutations, actions}
