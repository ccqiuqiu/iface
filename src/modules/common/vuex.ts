import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: CommonState = {
  menus: [],
}
const mutations: MutationTree<any> = {
  updateUser(state: CommonState, menus: Menu[]): void {
    state.menus = menus
  },
}

const actions: ActionTree<any, any> = {
  async getMenu(context: ActionContext<State, State>): Promise<any> {
    const {data} = await api.getMenu()
    if (data) {
      context.commit('updateUser', data.menus)
    }
  },
}

export default {state, mutations, actions}
