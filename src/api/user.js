import request from '@/utils/request'

export function login (loginParam) {
  return request.post('/auth/login', {
      ...loginParam
  })
}

export function getMenu () {
  return request.get('/menu/getMenuByRole')
}

export function refreshToken () {
  return request.get('/auth/refreshToken')
}
