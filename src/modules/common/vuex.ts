import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: CommonState = {
  menus: [],
  menuExpand: true,
  nav: [],
}
const mutations: MutationTree<any> = {
  updateUser(state: CommonState, menus: Menu[]): void {
    state.menus = menus
  },
  toggleMenu(state: CommonState): void {
    state.menuExpand = !state.menuExpand
  },
  updateNav(state: CommonState, menus: Menu[]): void {
    state.nav = menus
  },
}

const actions: ActionTree<any, any> = {
  async getMenu(context: ActionContext<CommonState, State>): Promise<any> {
    const {data} = await api.getMenu()
    if (data) {
      context.commit('updateUser', data)
    }
  },
}

export default {state, mutations, actions}
