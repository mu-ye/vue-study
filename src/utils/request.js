import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import message from 'ant-design-vue/es/message'
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '/api',
  timeout: 6000 // 请求超时时间
})

/**
 * axios 请求拦截器和响应拦截器错误处理程序
 * @param error
 * @returns {Promise<never>}
 */
const errorHandler = error => {
  const { name, response } = error
  console.log('error', name, ...response)
  if (response) {
    const data = response.data
    // 从 localstorage 获取 token
    const token = localStorage.get('token')
    if (response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        // store.dispatch('Logout').then(() => {
        //   setTimeout(() => {
        //     window.location.reload()
        //   }, 1500)
        // })
      }
    }
  }
  return Promise.reject(error)
}

// 添加请求拦截器
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  // 如果 token 存在，让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(response => {
  console.log('response interceptor', response)
  const { data } = response
  // data success data error
  if (data.success === false) {
    // 抛出错误到 errorHandler 中处理
    const error = new Error(data.errorMessage || '操作失' + '败')
    error.name = 'BizError'
    error.data = data
    message.error(data.errorMessage || '操作失败')
    throw error
  }
  return data.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export { installer as VueAxios, request as axios }
