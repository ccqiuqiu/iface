import * as Koa from 'koa'
import * as favicon from 'koa-favicon'
import * as responseTime from 'koa-response-time'
import * as log4js from 'koa-log4'
import * as compress from 'koa-compress'
import * as cors from 'kcors'
import * as serve from 'koa-static'
// import session from 'koa-session2' // https://github.com/Secbone/koa-session2
import session from './utils/session'
import redisStore from './utils/redisStore'
import * as koaBody from 'koa-bodyparser'
import routes from './services/index'
import { dbInit } from './data/db'
import {existsSync, mkdirSync} from 'fs'
import {hasAuth} from './utils'

// 创建日志目录
const logPath = 'logs'
if (!existsSync(logPath)) {
  mkdirSync(logPath)
}
// 初始化日志配置
log4js.configure({
  appenders: [
    {type: 'console'},
    {type: 'dateFile', filename: logPath + '/app.log', pattern: '-yyyy-MM-dd', alwaysIncludePattern: false, category: 'app', usefsync: true},
    {type: 'dateFile', filename: logPath + '/db.log', pattern: '-yyyy-MM-dd', alwaysIncludePattern: false, category: 'db', usefsync: true},
  ],
})
const logger = log4js.getLogger('app')

const app = new Koa()
// 使用一些中间件
app.use(favicon(__dirname + '/favicon.ico')) // favicon中间件
app.use(responseTime()) // 响应时间中间件 会设置X-Response-Time
app.use(log4js.koaLogger(logger, {level: 'auto'})) // 日志中间件
app.use(compress()) // 数据压缩中间件
app.use(cors({credentials: true})) // 跨域中间件
app.use(session({key: 'SESSIONID', maxAge: 20 * 60 * 1000, store: new redisStore()}))// koa-session2中间件
app.use(serve('static', {maxage: 20 * 60 * 1000}))// 设置静态文件中间件
app.use(koaBody()) // 解析post请求参数的中间件

// 验证登录
app.use(async (ctx, next) => {
  // 跳过不登录的页面
  if (ctx.request.url.replace(/^(\/.*?\/)(.*)/, '/$2').indexOf('/public/') === 0) {
    return await next()
  }
  // session里面有用户信息，说明已经登录
  if (ctx.session.user) {
    // 判断是否有资源权限
    if (hasAuth(ctx)) {
      await next()
    } else {
      ctx.body = {
        success: false,
        error: {
          code: 403,
          message: '越权操作，请联系管理员',
        },
      }
    }
  } else {
    ctx.body = {
      success: false,
      error: {
        code: 401,
        message: '未登录或已登录，请重新登录',
      },
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
