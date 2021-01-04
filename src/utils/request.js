import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import message from 'ant-design-vue/es/message'
import { refreshToken } from '@/api/user'
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: '/api',
  // 请求超时时间
  timeout: 6000
})

/**
 *  获取 accessToken
 * @returns {string}
 */
function getAccessToken () {
  return localStorage.getItem('access-token')
}

/**
 * axios 请求拦截器和响应拦截器错误处理程序，只有当请求失败是调用（httpStatus 不等于 200）
 *
 * @param error
 * @returns {Promise<never>}
 */
const errorHandler = error => {
  const { response } = error
  if (response) {
    const data = response.data
    // 根据 http状态码（httpStatus）执行不同操作
    if (response.status === 401) {
      notification.error({
        message: '用户名或密码错误，用户登录失败！'
        // description: 'Authorization verification failed'
      })
    } else if (response.status === 402) {
      console.log('402data', data.errorMessage)
      localStorage.setItem('access-token', data.errorMessage)
    } else if (response.status === 400) {
      alert('账号过期，请重新登录')
      // 清空 localStorage 中数据，并路由跳转到登录页面
      localStorage.clear()
      window.location.href = '/user/login'
    } else if (response.status === 403) {
      // 全局消息通知
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
  }
  return Promise.reject(error)
}

/**
 *  添加请求拦截器
 */
request.interceptors.request.use(config => {
  console.log('请求拦截器------')
  const token = getAccessToken()
  const refreshToken = localStorage.getItem('refresh-token')
  // 如果 token 存在，让每个请求携带自定义 token 请根据实际情况自行修改
  console.log('请求路径', config.url)
  if (token) {
    if (config.url === '/auth/refreshToken') {
      console.log('设置未 refreshToken')
      config.headers['Authorization'] = refreshToken
    } else {
      config.headers['Authorization'] = token
    }
  }
  return config
}, errorHandler)

/**
 * 添加响应拦截器
 */
request.interceptors.response.use(response => {
  console.log('response interceptor', response)
  const { data } = response
  // data success data error
  if (data.success === false) {
    if (data.errorCode === '4010') {
      // 用户名密码错误处理
      message.error(data.errorMessage)
    } else if (data.errorCode === '4011') {
      // 刷新 accessToken 和 refreshToken
      console.log(data.errorMessage)
      refreshToken()
        .then(data => {
          localStorage.setItem('access-token', data[0])
          localStorage.setItem('refresh-token', data[1])
          console.log('token 刷新成功')
          const config = response.config
          config.baseURL = '/api'
          config.headers['Authorization'] = data[0]
          return request(config)
        })
        .catch(err => {
          console.log(err)
        })
    } else if (data.errorCode === '4012') {
      alert('账号过期，请重新登录')
      localStorage.clear()
      window.location.href = '/user/login'
    } else {
      // 抛出错误到 errorHandler 中处理
      const error = new Error(data.errorMessage || '操作失' + '败')
      error.name = 'BizError'
      error.data = data
      message.error(data.errorMessage || '操作失败')
      throw error
    }
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
