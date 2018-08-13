import createBody from './createBody'
import * as Dao from '../../data/dao/index'
import * as jwt from 'jsonwebtoken'
import {jwtSecret, jwtExp} from '../config'
import * as redis from '../../utils/redis'

async function test(ctx) {
  // ctx.body = createBody('请求成功')
  ctx.body = {code: 200, object: 3, count: 400}
}

async function login(ctx) {
  const params = ctx.request.body
  const userAuth = await Dao.User.findUserAndAuth(params)
  if (userAuth) {
    const token = jwt.sign({data: userAuth.user}, jwtSecret, { expiresIn: jwtExp})
    // 保存用户信息到redis
    // ctx.session.user = userAuth.user
    // ctx.session.auth = userAuth.auth
    await redis.set(userAuth.user.id, userAuth, jwtExp)
    ctx.body = createBody({token})
  } else {
    ctx.body = createBody(null, false, '用户名密码不匹配')
  }
}

export default (routes: any, prefix: string) => {
  routes.get(prefix + '/public/test', test)
  routes.post(prefix + '/public/test', test)
  routes.post(prefix + '/public/login', login)
}
