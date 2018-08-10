/**
 * Created by 熊超超 on 2018/7/13.
 */

import * as uid from 'uid-safe'

export class Store {
  public session = {}
  constructor() {
    this.session = {}
  }

  public decode(str) {
    if (!str) { return '' }

    let session = ''

    try {
      session = new Buffer(str, 'base64').toString()
    } catch (e) {
      console.log(e)
    }

    return JSON.parse(session)
  }

  public encode(obj) {
    return new Buffer(obj).toString('base64')
  }

  public getID(length) {
    return uid.sync(length)
  }

  public async get(sid) {
    return this.decode(this.session[sid])
  }

  public async set(session, opts) {
    opts = opts || {}
    let sid = opts.sid
    if (!sid) {
      sid = this.getID(24)
    }

    this.session[sid] = this.encode(JSON.stringify(session))

    return sid
  }

  public async destroy(sid) {
    delete this.session[sid]
  }
}

export default function(opts: any = {}) {
  opts.key = opts.key || 'koa:sess'
  opts.store = opts.store || new Store()

  return async (ctx, next) => {
    let id = ctx.cookies.get(opts.key, opts)

    if (!id) {
      ctx.session = {}
    } else {
      ctx.session = await opts.store.get(id)
      // check session should be a no-null object
      if (typeof ctx.session !== 'object' || ctx.session == null) {
        ctx.session = {}
        ctx.cookies.set(opts.key, id, {maxAge: -1})
      }
    }

    const old = JSON.stringify(ctx.session)

    await next()

    // if not changed
    if (old === JSON.stringify(ctx.session)) {
      if (id && old !== '{}') {
        // 重新设置过期时间，保证只要一直有请求就不会过期
        await opts.store.set(ctx.session, Object.assign({}, opts, {sid: id}))
        ctx.cookies.set(opts.key, id, opts)
      }
      return
    }

    // clear old session if exists
    if (id) {
      await opts.store.destroy(id)
      // 退出的时候，设置客户端session过期
      ctx.cookies.set(opts.key, id, {maxAge: -1})
      id = undefined
    }

    // set new session
    if (ctx.session && Object.keys(ctx.session).length) {
      const sid = await opts.store.set(ctx.session, Object.assign({}, opts, {sid: id}))
      ctx.cookies.set(opts.key, sid, opts)
    }
  }
}
