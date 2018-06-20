/**
 * Created by 熊超超 on 2018/4/20.
 */
import conn from './conn'

const formBaseUrl = '/v1/system/'

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
  // 获取CRUD的json
  getCrud: (id: number, config: any = {}) => request('post', formBaseUrl + 'getCrud/' + id, config),
  // 表单按钮的统一方法
  formAction: (url: string, params: any, config: any = {}) => request('post', formBaseUrl + url, params, config),
  // 查询表单options
  getOptions: (url: string, config: any = {}) => request('post', formBaseUrl + url, {}, config),
  // 通过id查询数据，或者删除
  requestUrl: (url: string, config: any = {}) => request('post', formBaseUrl + url, {}, config),
  // 登录
  login: (params: any = {}, config: any = {}) => request('post', '/v1/public/login', params, config),
  // 用户列表
  userList: (params: any = {}, config: any = {}) => request('post', '/v1/system/searchUser', params, config),
  // 保存用户（新增或删除）
  saveUser: (params: any = {}, config: any = {}) => request('post', '/v1/system/saveUser', params, config),
  // 删除用户
  delUser: (id: number, config: any = {}) => request('post', '/v1/system/delUser/' + id, config),
}
