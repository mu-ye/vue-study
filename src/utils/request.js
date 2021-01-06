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
 * 刷新 token 的请求 URL
 * @type {string}
 */
const REFRESH_TOKEN_URL = '/auth/refreshToken'

/**
 * 获取 accessToken
 * @returns {string}
 */
function getAccessToken () {
  return localStorage.getItem('access-token')
}

/**
 * 获取刷新token
 * @returns {string}
 */
function getRefreshToken () {
  return localStorage.getItem('refresh-token')
}

/**
 * 请求拦截器和响应拦截器错误处理程序，只有当请求失败是调用（ httpStatus 不等于 200）
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
 * 添加请求拦截器
 */
request.interceptors.request.use(config => {
  // 如果请求是 [刷新token请求], 请求头中携带的token为 RefreshToken, 其他请求携带的token为 accessToken
  if (config.url === REFRESH_TOKEN_URL) {
    config.headers['Authorization'] = getRefreshToken()
  } else {
    // 如果 accessToken 存在,将 token 放入请求头中
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers['Authorization'] = accessToken
    }
  }
  return config
}, errorHandler)

/**
 * 添加响应拦截器
 */
request.interceptors.response.use(response => {
  // 拦截从后台截取到的数据 data结构为{ success ； data ；errorCode ；errorMessage ；}
  const { data } = response
  // 根据后台返回异常的错误码（errorCode）, 进行响应的处理
  if (data.success === false) {
    if (data.errorCode === '4010') {
      // 用户名密码错误处理
      message.error(data.errorMessage)
    } else if (data.errorCode === '4011') {
      // errorCode = 4011 时，向服务器请求新的 accessToken 和 refreshToken
      refreshToken()
        .then(data => {
          // 将获取的 accessToken 和 refreshToken 保存在 localStorage 中
          localStorage.setItem('access-token', data[0])
          localStorage.setItem('refresh-token', data[1])
          console.log('token 刷新成功')
          // 再次发起之前的请求，实现 token 的无痛刷新
          // 获取之前请求的config,请求头中设置新的 accessToken
          const config = response.config
          config.baseURL = '/api'
          config.headers['Authorization'] = getAccessToken()
          return request(config)
        })
        .catch(err => {
          console.log(err)
        })
    } else if (data.errorCode === '4012') {
      notification.error({
        message: '账号信息过期，请重新登录 ！'
      })
      // 清除本地 accessToken 和 refreshToken,并跳转到登录界面
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
