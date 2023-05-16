import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const refreshToken = 'refresh-Token'

const ExpiresInKey = 'Admin-Expires-In'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置刷新的token
export function getRefreshToken(){
  return Cookies.get(refreshToken)
}
export function setRefreshToken(token){
  return Cookies.set(refreshToken, token)
}
export function removeRefreshToken() {
  return Cookies.remove(refreshToken)
}
export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}
