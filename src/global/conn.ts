/**
 * Created by 熊超超 on 2018/4/20.
 */
import router from '@g/router'
import store from './store'
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
  // 加公共请求参数
  config.headers.token = lsUtils.get('token')

  // 从请求参数里面取出一些控制参数, 控制loading和error的显示
  const {_loading, _hideGlobalError, ...data} = config.data
  config.headers._loading = _loading !== false
  config.headers._hideGlobalError = _hideGlobalError
  if (config.method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  if (config.headers._loading) {
    store.commit('showLoading', _loading)
  }
  return config
})

// 注册响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse): Promise<any> => {
  // 从请求参数里面取出一些控制参数, 控制loading的显示,err的处理
  const {_loading, _hideGlobalError} = response.config.headers
  if (_loading) {
    store.commit('hideLoading')
  }
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
    // 默认情况下，此处统一提示服务端的错误信息，除非请求的时候设置了_hideGlobalError为true
    if (!_hideGlobalError) {
      uiUtils.message(response.data.error.message, 'error')
    }
    return Promise.reject(response.data.error)
  }
}, (error: any): Promise<any> => {
  uiUtils.message('服务端异常', 'error')
  return Promise.reject({code: error.response.status, message: error.response.data})
})

export default axiosInstance
