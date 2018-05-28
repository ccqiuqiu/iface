/**
 * Created by 熊超超 on 2018/5/28.
 */

export default {
  set(key: string, val: any): void {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  },
  get(key: string, defaultVal: any = ''): any {
    return localStorage.getItem(key) || defaultVal
  },
  getObj(key: string, defaultVal: any): any {
    const val = this.get(key, null)
    if (val) {
      return JSON.parse(val)
    }
    return defaultVal || null
  },
  remove(key: string): void {
    localStorage.removeItem(key)
  },
}
