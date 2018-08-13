import * as Redis from 'ioredis'

const redis = new Redis() // https://github.com/luin/ioredis

export const set = (key: string, value: any, maxAge: number = 20 * 60) => {
  redis.set(key, typeof value === 'string' ? value : JSON.stringify(value), 'EX', maxAge)
}
export const expire = (key: string, maxAge: number = 20 * 60) => {
  redis.expire(key, maxAge)
}
export const del = (key: string) => {
  redis.del(key)
}
export const get = async (key: string) => {
  const data = await redis.get(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}
