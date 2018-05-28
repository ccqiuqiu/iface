/**
 * Created by 熊超超 on 2018/5/3.
 */

export const StatusV = {
  禁用: 0,
  启用: 1,
}
export const StatusK: IndexEd = reverse(StatusV)

export const SexV = {
  男: 1,
  女: 0,
}
export const SexK: IndexEd = reverse(SexV)

// 反转对象的key-value
function reverse(source: any): any {
  const re: IndexEd = {}
  for (const key of Object.keys(source)) {
    re[source[key]] = key
  }
  return re
}
