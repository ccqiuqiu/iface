/**
 * Created by 熊超超 on 2018/5/28.
 */

export class LsUtils {
  public set(key: string, val: any): void {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    localStorage.setItem(key, val)
  }
  public get(key: string, defaultVal: any = ''): any {
    return localStorage.getItem(key) || defaultVal
  }
  public getObj(key: string, defaultVal: any): any {
    const val = this.get(key, null)
    if (val) {
      return JSON.parse(val)
    }
    return defaultVal || null
  }
  public remove(key: string): void {
    localStorage.removeItem(key)
  }
}
export default new LsUtils()
