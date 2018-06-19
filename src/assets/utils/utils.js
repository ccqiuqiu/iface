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
export const flatObject = (source, children = 'children') => {
  const re = []
  flatObjectDo(source, children, re)
  return re
}

function flatObjectDo (source, children, re) {
  source.forEach((s) => {
    re.push(s)
    if (s[children]) {
      flatObjectDo(s[children], children, re)
    }
  })
}

// 日期判断
export const isDate = (obj) => Object.prototype.toString.call(obj) === '[object Date]'
// 空对象判断
export const isEmptyObject = (obj = {}) => Object.keys(obj).length <= 0
