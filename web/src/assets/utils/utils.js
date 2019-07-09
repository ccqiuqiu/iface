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
  /**
   * 获取uuid
   */
  getUUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
  }
  shadeColor (color, shade) {
    color = color.replace('#', '')
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)
    red = red.toString(16).length === 1 ? '0' + red.toString(16) : red.toString(16)
    green = green.toString(16).length === 1 ? '0' + green.toString(16) : green.toString(16)
    blue = blue.toString(16).length === 1 ? '0' + blue.toString(16) : blue.toString(16)
    return `#${red}${green}${blue}`
  }
}
export const utils = new Utils()
