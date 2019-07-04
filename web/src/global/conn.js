/* eslint-disable prefer-promise-reject-errors */
/**
 * Created by 熊超超 on 2018/4/20.
 */
import store from './store'
import router from './router'
import { utils } from '../assets/utils/index'
import constant from '../assets/utils/constant'
import axios from 'axios'

// 创建一个axios实例
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 0 // 请求超时时间
})
// 注册请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // 加公共请求参数
  config.headers.token = sessionStorage.getItem('token') || ''
  return config
})

// 注册响应拦截器
axiosInstance.interceptors.response.use((response) => {
  if (response.config.responseType === 'blob') {
    let url = window.URL.createObjectURL(response.data)
    const contentDisposition = response.headers['content-disposition']
    let fileName = ''
    if (contentDisposition) {
      fileName = contentDisposition.replace(/.*filename=(.*)/, '$1')
    }
    fileName = decodeURI(fileName)
    utils.toLink(url, {download: fileName})
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)

    // document.body.appendChild(link)
    link.click()
    // document.body.removeChild(link)
    return
  }
  if (response.data.success || response.data.code === 200) {
    return Promise.resolve(response.data.data)
  } else {
    if (response.data.error.code === 401 || response.data.code === 401) {
      sessionStorage.removeItem('token')
      store.commit('hideDialog')
      store.commit('clearStore')
      setTimeout(() => location.pathname !== '/login' && router.push({name: 'login', query: {url: document.URL}}), 0)
    }
    return Promise.reject(response.data.error)
  }
}, (error) => {
  return Promise.reject({ code: error.response.status, message: '服务器异常，请稍候再试' })
})

/**
 * 所有请求的通用方法，此方法才会调用axios的方法
 * @param {string} method
 * @param {string} url
 * @param data  用户的请求数据，post、get一样传参就行，axios的请求拦截会分开处理
 * @param myConfig  非业务参数，主要是配置loading、error信息的显示等
 * @returns {Promise<any>}
 */
export default (method, url, data = {}, myConfig = {}) => {
  const config = {
    method, url
  }
  if (config.method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  if (myConfig.download) {
    config.responseType = 'blob'
  }
  if (myConfig.loading !== false) {
    utils.bus.$Progress.start()
  }
  return axiosInstance.request(config)
    .then((data) => {
      if (myConfig.loading !== false) {
        utils.bus.$Progress.finish()
      }
      return { data }
    })
    .catch((error) => {
      if (myConfig.loading !== false) {
        utils.bus.$Progress.fail()
      }
      // 默认情况下，此处统一提示服务端的错误信息，除非请求的时候设置了hideError为true
      if (!myConfig.hideError || [401, 403].includes(error.code)) {
        utils.message(error.message, constant.MessageType.error)
      }
      return { error }
    })
}
