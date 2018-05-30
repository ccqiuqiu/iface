import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: SystemState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
  // 用户列表
  userList(context: ActionContext<SystemState, State>): Promise<any> {
     return api.userList()
  },
  // 保存用户
  saveUser(context: ActionContext<SystemState, State>, user: User): Promise<any> {
     return api.saveUser(user)
  },
  // 删除用户
  delUser(context: ActionContext<SystemState, State>, id: number): Promise<any> {
     return api.delUser(id)
  },
}

export default {state, mutations, actions}
