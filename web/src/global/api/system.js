/**
 * Created by 熊超超 on 2018/4/20.
 */
import request from '../conn'

const formBaseUrl = '/v1/'

export default {
  searchPage: (params, config = {}) => request('get', '/v1/baseData/page', params, config),
  getPage: (pageCode, config = {}) => request('get', '/v1/baseData/page/' + pageCode, config),
  savePage: (params = {}, config = {}) => request('put', '/v1/baseData/page', params, config),
  delPage: (id, config = {}) => request('delete', `/v1/baseData/page/${id}`, {}, config),
  // 查询表单options
  getOptions: (url, config = {}) => request('get', '/v1/base/' + url, {}, config),
  // 查询表单options,类型为dialog的
  getPageOptions: (code, config = {}) => request('get', '/v1/base/pageOptions/' + code, {}, config),
  // 传url直接请求接口
  requestUrl: (method = 'get', url, params, config = {}) => request(method, url.startsWith('/') || url.startsWith('http') ? url : formBaseUrl + url, params, config),
  // 登录
  login: (params = {}, config = {}) => request('post', '/v1/public/login', params, config),
  // ticket登录
  ticketLogin: (params, config = {}) => request('post', '/v1/public/ticketLogin', params, config),
  // 获取权限
  getAuth: (params = {}, config = {}) => request('get', '/v1/system/auth', params, config),
  // 获取菜单树
  menuTree: (params = {}, config = {}) => request('get', '/v1/system/menuTree', params, config),
  // 删除菜单
  delMenu: (id, config = {}) => request('del', '/v1/system/menu/' + id, config),
  // 删除菜单
  sortMenu: (params = {}, config = {}) => request('put', '/v1/system/sortMenu', params, config),
  // 获取用户首页的仪表盘信息
  getUserDashboard: (params = {}, config = {}) => request('get', '/v1/base/userDashboard', params, config),
  // 获取所有的仪表盘
  getAllDashboard: (params = {}, config = {}) => request('get', '/v1/base/allDashboard', params, config),
  // 保存用户的仪表盘布局
  saveUserDashboard: (params = {}, config = {}) => request('put', '/v1/base/userDashboard', params, config),
  // 获取角色组
  getRoleGroup: (params = {}, config = {}) => request('get', '/v1/system/roleGroup', params, config),
}
