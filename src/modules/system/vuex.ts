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
  delMenu(context: ActionContext<CommonState, State>, id: number): Promise<ActionReturn> {
    return api.delMenu(id)
  },
}

export default {state, mutations, actions}
