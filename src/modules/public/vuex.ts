import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: PublicState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
  // 用户登录
  login(context: ActionContext<CommonState, State>, user: User): Promise<any> {
     return api.login(user)
  },
  // 用户退出登录
  logout(context: ActionContext<CommonState, State>): Promise<any> {
    return api.logout()
  },
  // 保存接口录制的数据
  saveRecord(context: ActionContext<CommonState, State>) {
    return api.saveRecord()
  },
}

export default {state, mutations, actions}
