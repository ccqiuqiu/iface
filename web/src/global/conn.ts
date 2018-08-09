/**
 * Created by 熊超超 on 2018/4/20.
 */
import router from '@g/router'
import store from './store'
import {utils} from '@utils/index'
import app from '../main'

import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {MessageTypeEnum} from '@utils/enums'
// 创建一个axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 0, // 请求超时时间
})
// 注册请求拦截器
axiosInstance.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  // 加公共请求参数

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
    app.$Progress.start()
    // store.commit('showLoading', _loading)
  }
  return config
})

// 注册响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse): Promise<any> => {
  // 从请求参数里面取出一些控制参数, 控制loading的显示,err的处理
  const {_loading, _hideGlobalError} = response.config.headers
  // if (_loading) {
  //   store.commit('hideLoading')
  // }
  if (response.data.success) {
    if (_loading) {
      app.$Progress.finish()
    }
    // 如果是录制模式，每个请求返回后，将结果发送到录制服务器
    if (process.env.VUE_APP_RECORD) {
      const url = response.config.url!.replace(response.config.baseURL!, '')
      requestRecord('', {url, data: response.data.data})
    }
    return Promise.resolve(response.data.data)
  } else {
    if (_loading) {
      app.$Progress.fail()
    }
    if (response.data.error.code === 401) {
      store.commit('clearStore')
      setTimeout(() => router.push('/login'), 0)
    }
    // 默认情况下，此处统一提示服务端的错误信息，除非请求的时候设置了_hideGlobalError为true
    if (!_hideGlobalError || [401, 403].includes(response.data.error.code)) {
      utils.message(response.data.error.message, MessageTypeEnum.error)
    }
    return Promise.reject(response.data.error)
  }
}, (error: any): Promise<any> => {
  // 从请求参数里面取出一些控制参数, 控制loading的显示,err的处理
  const {_loading, _hideGlobalError} = error.config.headers
  if (_loading) {
    // store.commit('hideLoading')
    app.$Progress.fail()
  }
  utils.message('服务端异常', MessageTypeEnum.error)
  return Promise.reject({code: error.response.status, message: error.response.data})
})

export default axiosInstance

const axiosRecord = axios.create({
  baseURL: process.env.VUE_APP_RECORD_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
export function requestRecord(url: string, data?: any) {
  return axiosRecord.post(url, data)
}
