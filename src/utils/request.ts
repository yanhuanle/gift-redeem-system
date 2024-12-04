import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
  timeout: 10000, // 请求超时时间
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export interface Response {
  status: number
  statusText: string
  data: {
    code: number
    data: any
  }
}

export type ResponseError = AxiosError<{
  message?: string
  result?: any
  errorMessage?: string
}>

// Add a request interceptor
request.interceptors.request.use(requestHandler)

// 请求拦截器
function requestHandler(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
  return config
}

// Add a response interceptor
request.interceptors.response.use(responseHandler, errorHandler)

// 响应拦截器
function responseHandler(res: Response) {
  if (res.data.code === 200) {
    return res.data
  }
  else {
    return {
      code: '401',
      msg: 'error'
    }
  }
}

// 异常拦截处理器
function errorHandler(error: ResponseError): Promise<any> {
  // 请求已发出，但服务器响应的状态码不在 2xx 范围内
  if (error.response) {
    const { data = {}, statusText } = error.response
    console.log('Response error', data.message || statusText)
  }
  // 请求已发出，但没有收到响应。例如：请求超时或请求被取消
  else if (error.request) {
    console.log('Request error', error.request)
  }
  // 发送请求时发生了一些事情，导致请求没有发出
  else {
    console.log('Error', error.message);
  }
  return Promise.reject(error)
}

export default request
