import createBody from './createBody'
import * as Dao from '../../data/dao/index'
import * as jwt from 'jsonwebtoken'
import {jwtSecret, jwtExp} from '../config'
import * as redis from '../../utils/redis'

async function test (ctx) {
  // ctx.body = createBody('请求成功')
  ctx.body = createBody({code: 200, object: 3, count: 400})
}

async function login (ctx) {
  const params = ctx.request.body
  const user = await Dao.User.findOne(params)
  if (user) {
    const token = jwt.sign({data: user}, jwtSecret, { expiresIn: jwtExp})
    // 获取用户权限保存redis
    const auth = await Dao.User.findUserAuth(user.id)
    await redis.set(user.id, {user, auth}, jwtExp)
    ctx.body = createBody({token})
  } else {
    ctx.body = createBody(null, false, '用户名密码不匹配')
  }
}
async function ticketLogin (ctx) {
  ctx.request.body = {name: 'admin', password: '123456'}
  await login(ctx)
}

export default (routes, prefix) => {
  routes.get(prefix + '/public/test', test)
  routes.post(prefix + '/public/test', test)
  routes.post(prefix + '/public/login', login)
  routes.post(prefix + '/public/ticketLogin', ticketLogin)
}
