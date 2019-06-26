/**
 * Created by 熊超超 on 2018/4/28.
 */

export default class Utils {
  /**
   * 通过传入的children字段名，将多层级的对象打平为一个数组
   * @param {T} source
   * @param {string} children
   * @returns {T[]}
   * 例如  [{id: 1, children: [{id: 2}]}] => [{id: 1}, {id: 2}]
   */
  flatObject (source, children = 'children') {
    const re = []
    const clone = JSON.parse(JSON.stringify(source))
    this.flatObjectDo(clone, children, re)
    return re
  }

  // 日期判断
  isDate (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]'
  }
  isObj (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  // 空对象判断
  isEmptyObject (obj) {
    return Object.keys(obj).length <= 0
  }
  //
  delEmptyProp (obj = {}) {
    for (const key of Object.keys(obj)) {
      if (this.isObj(obj[key])) {
        this.delEmptyProp(obj[key])
      }
      if (obj[key] === null || obj[key] === undefined || obj[key] === '' || (this.isObj(obj[key]) && this.isEmptyObject(obj[key]))) {
        delete obj[key]
      }
    }
    return obj
  }
  // 对象转为数组
  objToArr (obj = {}, labelField = 'label', valueField = 'value') {
    const arr = []
    for (const key of Object.keys(obj)) {
      arr.push({ [labelField]: key, [valueField]: obj[key] })
    }
    return arr
  }

  // 反转对象的key-value
  reverse (source) {
    const re = {}
    for (const key of Object.keys(source)) {
      re[source[key]] = key
    }
    return re
  }

  flatObjectDo (source, children, re, parentId) {
    source.forEach((s) => {
      if (parentId) {
        s.parentId = parentId
      }
      re.push(s)
      if (s[children]) {
        this.flatObjectDo(s[children], children, re, s.id)
        delete s[children]
      }
    })
  }
  url2Obj (url = document.URL) {
    const q = {}
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v))
    return q
  }
  getUrlParams (name, url) {
    return this.url2Obj(url)[name]
  }
}
export const utils = new Utils()
