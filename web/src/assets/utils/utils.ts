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
  public flatObject<T extends TT>(source: T[], children: string = 'children'): T[] {
    const re: T[] = []
    const clone = JSON.parse(JSON.stringify(source))
    this.flatObject_do(clone, children, re)
    return re
  }

// 日期判断
  public isDate(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Date]'
  }
  public isObj(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
// 空对象判断
  public isEmptyObject(obj: any = {}): boolean {
    return Object.keys(obj).length <= 0
  }
//
  public delEmptyProp(obj: any = {}) {
    for (const key of Object.keys(obj)) {
      if (this.isObj(obj[key])) {
        this.delEmptyProp(obj[key])
      }
      if (obj[key] === null || obj[key] === undefined || this.isObj(obj[key]) && this.isEmptyObject(obj[key])) {
        delete obj[key]
      }
    }
  }
// 对象转为数组
  public objToArr(obj: any = {}, labelField: string = 'label', valueField: string = 'value'): any[] {
    const arr: any[] = []
    for (const key of Object.keys(obj)) {
      arr.push({[labelField]: key, [valueField]: obj[key]})
    }
    return arr
  }

// 反转对象的key-value
  public reverse(source: any): any {
    const re: IndexEd = {}
    for (const key of Object.keys(source)) {
      re[source[key]] = key
    }
    return re
  }

  private flatObject_do<T extends TT>(source: T[], children: string, re: T[], parentId: any = null): void {
    source.forEach((s: T) => {
      if (parentId) {
        s.parentId = parentId
      }
      re.push(s)
      if (s[children]) {
        this.flatObject_do(s[children], children, re, s.id)
        delete s[children]
      }
    })
  }
}
