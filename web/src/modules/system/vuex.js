import api from '../../global/api'

const state = {
}
const mutations = {
}

const actions = {
  getAuth (context) {
    return api.getAuth()
  },
  menuTree (context) {
    return api.menuTree()
  },
  delMenu (context, id) {
    return api.delMenu(id)
  },
  sortMenu (context, params) {
    return api.sortMenu(params)
  }
}

export default { state, mutations, actions }
