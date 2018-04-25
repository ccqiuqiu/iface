/**
 * Created by 熊超超 on 2018/4/20.
 */
import conn from './conn'

const request = (method: string, url: string, data: any = {}, config: any = {}): Promise<any> => {
  data = {...data, ...config}
  return conn.request({method, url, data}).then((data: any) => ({data})).catch((err: any) => ({err}))
}

export default {
  getMenu: (params: any = {}, config: any = {}) => request('post', '/getMenu', params, config),
}
