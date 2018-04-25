/**
 * Created by 熊超超 on 2018/4/20.
 */
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
  return config
})

// 注册响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse): Promise<any> => {
  return Promise.resolve(response.data)
}, (error: any): Promise<any> => {
  return Promise.reject(error)
})

export default axiosInstance
