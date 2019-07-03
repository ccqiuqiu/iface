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
  },
  async getRoleGroup (context, params) {
    const {data} = await api.getRoleGroup(params, {hideError: true})
    if (data) {
      return data.map(item => ({label: item.name, value: item.id}))
    }
    return []
  }
}

export default { state, mutations, actions }
