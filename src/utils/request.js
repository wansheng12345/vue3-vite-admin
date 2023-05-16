import axios from 'axios'
import Qs from 'qs'
const service = axios.create({
  baseURL:'/dev-api',
  timeout: 60000 
})

service.interceptors.request.use(
  config => {
    let token=sessionStorage.getItem('token')
    if(token){
      config.headers['Authorization']=token
    }
    return config
  },
  error => Promise.reject(error)
)

service.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)
// 以下为为请求方法单独封装
export function post(url, params) {
  return service({
    method: 'post',
    url,
    data: Qs.stringify(params),
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
export function get(url, param) {
  return service({
    method: 'get',
    url,
    params: param
  })
}
export default {
  service,
  post,
  get
}
// export default service
