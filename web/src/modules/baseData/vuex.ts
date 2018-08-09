import { MutationTree, ActionTree, ActionContext } from 'vuex'
import api from '../../global/api'

const state: SystemState = {
}
const mutations: MutationTree<any> = {
}

const actions: ActionTree<any, any> = {
  //
  searchPage(context: ActionContext<SystemState, State>, params: any): Promise<any> {
    return api.searchPage(params)
  },
  //
  getPage(context: ActionContext<SystemState, State>, pageCode: string): Promise<any> {
    return api.getPage(pageCode)
  },
  //
  savePage(context: ActionContext<SystemState, State>, page: Page): Promise<any> {
    return api.savePage(page)
  },
}

export default {state, mutations, actions}
