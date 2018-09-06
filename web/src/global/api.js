/**
 * Created by 熊超超 on 2018/4/20.
 */
import conn, {requestRecord} from './conn'

const formBaseUrl = '/v1/page/'

/**
 * 所有请求的通用方法，此方法才会调用axios的方法
 * @param {string} method
 * @param {string} url
 * @param data  用户的请求数据，post、get一样传参就行，axios的请求拦截会分开处理
 * @param config  非业务参数，主要是配置loading、error信息的显示等
 * @returns {Promise<any>}
 */
const request = (method, url, data = {}, config = {}) => {
  data = {...data, ...config}
  return conn.request({method, url, data}).then((data) => ({data})).catch((error) => ({error}))
}

export default {
  searchPage: (params, config = {}) => request('post', formBaseUrl + 'searchPage', params, config),
  getPage: (pageCode, config = {}) => request('post', formBaseUrl + 'getPage/' + pageCode, config),
  savePage: (params = {}, config = {}) => request('post', formBaseUrl + 'savePage', params, config),
  // 表单按钮的统一方法
  formAction: (url, params, config = {}) => request('post', formBaseUrl + url, params, config),
  // 查询表单options
  getOptions: (url, config = {}) => request('get', '/v1/base/' + url, {}, config),
  // 查询表单options,类型为dialog的
  getPageOptions: (code, config = {}) => request('post', '/v1/base/getPageOptions/' + code, {}, config),
  // 传url直接请求接口
  requestUrl: (url, params = {}, config = {}) => request('post', url, params, config),
  // 通过id查询数据，或者删除
  formRequest: (url, config = {}) => request('post', formBaseUrl + url, {}, config),
  // 登录
  login: (params = {}, config = {}) => request('post', '/v1/public/login', params, config),
  // 获取权限
  getAuth: (params = {}, config = {}) => request('get', '/v1/base/getAuth', params, config),
  // 获取菜单树
  menuTree: (params = {}, config = {}) => request('post', '/v1/system/menuTree', params, config),
  // 删除菜单
  delMenu: (id, config = {}) => request('post', '/v1/system/delMenu/' + id, config),
  // 删除菜单
  sortMenu: (params = {}, config = {}) => request('post', '/v1/system/sortMenu', params, config),
  // 获取用户首页的仪表盘信息
  getUserDashboard: (params = {}, config = {}) => request('get', '/v1/base/getUserDashboard', params, config),
  // 获取所有的仪表盘
  getAllDashboard: (params = {}, config = {}) => request('get', '/v1/base/getAllDashboard', params, config),
  // 保存用户的仪表盘布局
  saveUserDashboard: (params = {}, config = {}) => request('post', '/v1/base/saveUserDashboard', params, config),
  //
  // 保存接口录制的数据
  saveRecord: () => requestRecord('/save')
}
