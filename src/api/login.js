import request from '@/utils/request'

export default {
  login: params => request.post('/token', params),
  test: params => request.get('/User/Index'),
  getInfo: token => request.get('/User', {token}),
  logout: data => request.post('/vue-admin-template/user/logout', data)
}