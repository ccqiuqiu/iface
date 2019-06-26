import api from '../../global/api'

const state = {
}
const mutations = {
}

const actions = {
  // 用户登录
  login (context, user) {
    return api.login(user)
  },
  // 通过sso的ticket登录
  ticketLogin (context, params) {
    return api.ticketLogin(params)
  },
  // 保存接口录制的数据
  saveRecord (context) {
    return api.saveRecord()
  }
}

export default { state, mutations, actions }
