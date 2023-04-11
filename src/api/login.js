import request from '@/utils/request'

// 登录方法
export function login(username, password, code, appId="b6467f1a981144ceab51c770093e3125") {
  return request({
    url: '/auth/ADLogin',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { username, password,appId }
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}
// 获取菜单路由
export function getRouters (){
  return request({
    url: '/system/menu/getRouters',
    method: 'get'
  })
}
// 退出方法
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  })
}