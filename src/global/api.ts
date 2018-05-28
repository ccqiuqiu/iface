/**
 * Created by 熊超超 on 2018/4/20.
 */
import conn from './conn'

const request = (method: string, url: string, data: any = {}, config: any = {}): Promise<any> => {
  data = {...data, ...config}
  return conn.request({method, url, data}).then((data: any) => ({data})).catch((error: any) => ({error}))
}

export default {
  login: (params: any = {}, config: any = {}) => request('post', '/v1/public/login', params, config),
  getAuth: (params: any = {}, config: any = {}) => request('post', '/v1/system/getAuth', params, config),
  userList: (params: any = {}, config: any = {}) => request('post', '/v1/system/userList', params, config),
  saveUser: (params: any = {}, config: any = {}) => request('post', '/v1/system/saveUser', params, config),
  delUser: (params: any = {}, config: any = {}) => request('post', '/v1/system/delUser/' + params, config),
}
