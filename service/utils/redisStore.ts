import * as Redis from 'ioredis'
import {Store} from './session'
let redis = null
export default class RedisStore extends Store {
  redis = null
  constructor() {
    super()
    this.redis = new Redis() // https://github.com/luin/ioredis
    redis = this.redis
  }

  public async get(sid) {
    const data = await this.redis.get(`SESSION:${sid}`)
    return JSON.parse(data)
  }

  public async set(session, {sid = this.getID(24), maxAge = 1000000}) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000)
    } catch (e) {}
    return sid
  }

  public async destroy(sid) {
    return await this.redis.del(`SESSION:${sid}`)
  }
}

export const set = (key: string, value: any, maxAge: number = 20 * 60) => {
  redis.set(key, typeof value === 'string' ? value : JSON.stringify(value), 'EX', maxAge)
}
export const get = async (key: string) => {
  const data = await redis.get(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}