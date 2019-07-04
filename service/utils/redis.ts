import * as Redis from 'ioredis'

const redis = new Redis() // https://github.com/luin/ioredis

// new Redis(6379, "192.168.1.1"); // 192.168.1.1:6379
// new Redis({
//   port: 6379, // Redis port
//   host: "127.0.0.1", // Redis host
//   family: 4, // 4 (IPv4) or 6 (IPv6)
//   password: "auth",
//   db: 0
// });

export const set = (key, value, maxAge = 20 * 60) => {
  redis.set(key, typeof value === 'string' ? value : JSON.stringify(value), 'EX', maxAge)
}
export const expire = (key, maxAge = 20 * 60) => {
  redis.expire(key, maxAge)
}
export const del = (key) => {
  redis.del(key)
}
export const get = async (key) => {
  const data = await redis.get(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}
