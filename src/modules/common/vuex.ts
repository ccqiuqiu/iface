import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: Store.CommonState = {
  menus: [],
}
const mutations: MutationTree<any> = {
  updateUser(state: Store.CommonState, menus: Store.Menu[]): void {
    state.menus = menus
  },
}

const actions: ActionTree<any, any> = {
  async getMenu(context: ActionContext<Store.CommonState, Store.State>): Promise<any> {
    const {data} = await api.getMenu()
    if (data) {
      context.commit('updateUser', data)
    }
  },
}

export default {state, mutations, actions}
