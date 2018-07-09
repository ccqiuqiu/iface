import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: SystemState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
  menuTree(context: ActionContext<CommonState, State>): Promise<ActionReturn> {
    return api.menuTree()
  },
}

export default {state, mutations, actions}
