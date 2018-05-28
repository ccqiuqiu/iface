import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: SystemState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
  userList(context: ActionContext<SystemState, State>): Promise<any> {
     return api.userList()
  },
  saveUser(context: ActionContext<SystemState, State>, user: User): Promise<any> {
     return api.saveUser(user)
  },
  delUser(context: ActionContext<SystemState, State>, id: number): Promise<any> {
     return api.delUser(id)
  },
}

export default {state, mutations, actions}
