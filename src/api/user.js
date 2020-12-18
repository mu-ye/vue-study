import request from '@/utils/request'

export function login (loginParam) {
  return request.post('/login', {
      ...loginParam
  })
}

export function getMenu () {
  return request.get('/menu/getMenuByRole')
}
