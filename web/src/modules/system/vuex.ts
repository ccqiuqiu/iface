import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: SystemState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
  getAuth(context: ActionContext<CommonState, State>): Promise<ActionReturn> {
    return api.getAuth()
  },
  menuTree(context: ActionContext<CommonState, State>): Promise<ActionReturn> {
    return api.menuTree()
  },
  delMenu(context: ActionContext<CommonState, State>, id: number): Promise<ActionReturn> {
    return api.delMenu(id)
  },
  sortMenu(context: ActionContext<CommonState, State>, params: any): Promise<ActionReturn> {
    return api.sortMenu(params)
  },
}

export default {state, mutations, actions}
