/**
 * Created by 熊超超 on 2018/4/20.
 */
import router from '@g/router'
import * as uiUtils from '@utils/uiUtils'
import lsUtils from '@utils/lsUtils'

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
// 创建一个axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 45000, // 请求超时时间
})
// 注册请求拦截器
axiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  // mock环境将token加到请求参数里面，以返回正确的权限
  if (process.env.VUE_APP_MOCK && config.url === '/v1/system/getAuth') {
    config.data.token = lsUtils.get('token')
  }
  // 加公共请求参数
  config.headers.token = lsUtils.get('token')
  return config
})

// 注册响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse): Promise<any> => {
  if (response.data.success) {
    // mock环境模拟登录过期
    if (process.env.VUE_APP_MOCK && !lsUtils.get('token')) {
      uiUtils.message('登录过期，请重新登录', 'error')
      router.push('/login')
    }
    return Promise.resolve(response.data.data)
  } else {
    if (response.data.error.code === 401) {
      router.push('/login')
    }
    uiUtils.message(response.data.error.message, 'error')
    return Promise.reject(response.data.error)
  }
}, (error: any): Promise<any> => {
  uiUtils.message('服务端异常', 'error')
  return Promise.reject({code: error.response.status, message: error.response.data})
})

export default axiosInstance
