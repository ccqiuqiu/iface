import api from '../../global/api'

const state = {
}
const mutations = {
}

const actions = {
  // 用户登录
  login (context, user) {
    return api.login(user)
  }
}

export default {state, mutations, actions}
