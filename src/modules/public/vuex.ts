import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: PublicState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
   login(context: ActionContext<CommonState, State>, user: User): Promise<any> {
     return api.login(user)
  },
}

export default {state, mutations, actions}
