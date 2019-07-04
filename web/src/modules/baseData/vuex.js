import api from '../../global/api'

const state = {
}
const mutations = {
}

const actions = {
  //
  searchPage (context, params) {
    return api.searchPage(params)
  },
  //
  getPage (context, pageCode) {
    return api.getPage(pageCode)
  },
  //
  savePage (context, page) {
    return api.savePage(page)
  },
  delPage (context, id) {
    return api.delPage(id)
  },
}

export default {state, mutations, actions}
