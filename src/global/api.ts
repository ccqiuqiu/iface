/**
 * Created by 熊超超 on 2018/4/20.
 */
import conn from './conn'

const formBaseUrl = '/v1/page/'

/**
 * 所有请求的通用方法，此方法才会调用axios的方法
 * @param {string} method
 * @param {string} url
 * @param data  用户的请求数据，post、get一样传参就行，axios的请求拦截会分开处理
 * @param config  非业务参数，主要是配置loading、error信息的显示等
 * @returns {Promise<any>}
 */
const request = (method: string, url: string, data: any = {}, config: any = {}): Promise<any> => {
  data = {...data, ...config}
  return conn.request({method, url, data}).then((data: any) => ({data})).catch((error: any) => ({error}))
}

export default {
  searchPage: (params: {pageNum: number, pageSize: number}, config: any = {}) => request('post', formBaseUrl + 'searchPage', params, config),
  getPage: (id: string, config: any = {}) => request('post', formBaseUrl + 'getPage/' + id, config),
  savePage: (params: any = {}, config: any = {}) => request('post', formBaseUrl + 'savePage', params, config),
  // 表单按钮的统一方法
  formAction: (url: string, params: any, config: any = {}) => request('post', formBaseUrl + url, params, config),
  // 查询表单options
  getOptions: (url: string, config: any = {}) => request('post', formBaseUrl + url, {}, config),
  // 通过id查询数据，或者删除
  requestUrl: (url: string, config: any = {}) => request('post', formBaseUrl + url, {}, config),
  // 登录
  login: (params: any = {}, config: any = {}) => request('post', '/v1/public/login', params, config),
  // 获取权限
  getAuth: (params: any = {}, config: any = {}) => request('post', '/v1/system/getAuth', params, config),
  // 退出登录
  logout: (params: any = {}, config: any = {}) => request('post', '/v1/public/logout', params, config),
  // 获取菜单树
  menuTree: (params: any = {}, config: any = {}) => request('post', '/v1/system/menuTree', params, config),
  // 删除菜单
  delMenu: (id: number, config: any = {}) => request('post', '/v1/system/delMenu/' + id, config),
}
