import createBody from './createBody'
import * as Dao from '../../data/dao/index'

async function test(ctx) {
  // ctx.body = createBody('请求成功')
  ctx.body = {code: 200, object: 3, count: 400}
}

async function login(ctx) {
  const params = ctx.request.body
  const userAuth = await Dao.User.findUserAndAuth(params)
  if (userAuth) {
    // 保存用户信息到session
    ctx.session.user = userAuth.user
    ctx.session.auth = userAuth.auth
    ctx.body = createBody()
  } else {
    ctx.body = createBody(null, false, '用户名密码不匹配')
  }
}

async function logout(ctx) {
  ctx.session = null
  ctx.body = createBody()
}

export default (routes: any, prefix: string) => {
  routes.get(prefix + '/public/test', test)
  routes.post(prefix + '/public/test', test)
  routes.post(prefix + '/public/login', login)
  routes.post(prefix + '/public/logout', logout)
}
