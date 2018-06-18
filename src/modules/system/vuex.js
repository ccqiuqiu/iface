import api from '../../global/api'

const state = {
}
const mutations = {
}

const actions = {
  // 用户列表
  userList (context) {
    return api.userList()
  },
  // 保存用户
  saveUser (context, user) {
    return api.saveUser(user)
  },
  // 删除用户
  delUser (context, id) {
    return api.delUser(id)
  }
}

export default {state, mutations, actions}
