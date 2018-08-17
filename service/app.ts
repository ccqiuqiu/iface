import * as Koa from 'koa'
import * as favicon from 'koa-favicon'
import * as responseTime from 'koa-response-time'
import * as log4js from 'koa-log4'
import * as compress from 'koa-compress'
import * as cors from 'kcors'
import * as serve from 'koa-static'
import * as koaBody from 'koa-bodyparser'
import routes from './services/index'
import { dbInit } from './data/db'
import {existsSync, mkdirSync} from 'fs'
import {hasAuth} from './utils'
import * as jwt from 'jsonwebtoken'
import {jwtSecret, jwtExp, jwtReTime} from './services/config'
import * as redis from './utils/redis'

// 创建日志目录
const logPath = 'logs'
if (!existsSync(logPath)) {
  mkdirSync(logPath)
}
// 初始化日志配置
log4js.configure({
  appenders: {
    console: {type: 'console'},
    app: { type: 'file', filename: logPath + '/app.log', pattern: '-yyyy-MM-dd', alwaysIncludePattern: false, usefsync: true},
    db: { type: 'file', filename: logPath + '/db.log', pattern: '-yyyy-MM-dd', alwaysIncludePattern: false, usefsync: true},
  },
  categories: {
    default: { appenders: ['console', 'app'], level: 'ALL' },
    db: { appenders: ['console', 'db'], level: 'ALL' },
  },
})
const logger = log4js.getLogger()

const app = new Koa()
// 使用一些中间件
app.use(favicon(__dirname + '/favicon.ico')) // favicon中间件
app.use(responseTime()) // 响应时间中间件 会设置X-Response-Time
app.use(log4js.koaLogger(logger)) // 日志中间件
app.use(compress()) // 数据压缩中间件
app.use(cors({credentials: true})) // 跨域中间件
app.use(serve('static', {maxage: 20 * 60 * 1000}))// 设置静态文件中间件
app.use(koaBody()) // 解析post请求参数的中间件

// 验证登录
app.use(async (ctx, next) => {
  // 跳过不登录的页面
  if (ctx.request.url.replace(/^(\/.*?\/)(.*)/, '/$2').indexOf('/public/') === 0) {
    return await next()
  }
  let decoded = null
  try {
    const token = ctx.headers['token']
    decoded = jwt.verify(token, jwtSecret)
    ctx.state.session = await redis.get(decoded.data.id)
    // 如果redis里面没有缓存，抛出异常
    if (!ctx.state.session) {
      throw Error('')
    }
  } catch (err) {
    ctx.body = {
      success: false,
      error: {
        code: 401,
        message: '未登录或已登录，请重新登录',
      },
    }
  }
  if (decoded) {
    // 鉴权
    if (hasAuth(ctx)) {
      await next()
      // 如果token快过期，刷新token
      const time = decoded.exp - new Date().getTime() / 1000
      if (time <= jwtReTime) {
        const tokenNew = jwt.sign({data: decoded.data}, jwtSecret, { expiresIn: jwtExp })
        await redis.expire(decoded.data.id, jwtExp)
        ctx.body.token = tokenNew
      }
    } else {
      ctx.body = {
        success: false,
        error: {
          code: 403,
          message: '越权操作，请联系管理员',
        },
      }
    }
  }
})

// 路由
app.use(routes.routes())
app.use(routes.allowedMethods())

// 全局异常
app.on('error', (err, ctx) => {
  logger.error('服务器异常', err)
})

dbInit(app)
