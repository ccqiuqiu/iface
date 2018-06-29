/**
 * Created by 熊超超 on 2018/4/28.
 */

/**
 * 通过传入的children字段名，将多层级的对象打平为一个数组
 * @param {T} source
 * @param {string} children
 * @returns {T[]}
 * 例如  [{id: 1, children: [{id: 2}]}] => [{id: 1}, {id: 2}]
 */
export const flatObject = <T extends TT>(source: T[], children: string = 'children'): T[] => {
  const re: T[] = []
  const clone = JSON.parse(JSON.stringify(source))
  flatObject_do(clone, children, re)
  return re
}

function flatObject_do<T extends TT>(source: T[], children: string, re: T[], parentId: any = null): void {
  source.forEach((s: T) => {
    if (parentId) {
      s.parentId = parentId
    }
    re.push(s)
    if (s[children]) {
      flatObject_do(s[children], children, re, s.id)
      delete s[children]
    }
  })
}

// 日期判断
export const isDate = (obj: any) => Object.prototype.toString.call(obj) === '[object Date]'
export const isObj = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]'
// 空对象判断
export const isEmptyObject = (obj: any = {}) => Object.keys(obj).length <= 0
//
export const delEmptyProp = (obj: any = {}) => {
  for (const key of Object.keys(obj)) {
    if (isObj(obj[key])) {
      delEmptyProp(obj[key])
    }
    if (obj[key] === null || obj[key] === undefined || isObj(obj[key]) && isEmptyObject(obj[key])) {
      delete obj[key]
    }
  }
}
//
export const objToArr = (obj: any = {}, labelField: string = 'label', valueField: string = 'value'): any[] => {
  const arr: any[] = []
  for (const key of Object.keys(obj)) {
    arr.push({[labelField]: key, [valueField]: obj[key]})
  }
  return arr
}
