// // 配置axios
import axios from 'axios'

const instance = axios.create({
//   // 配置对象 基准路径，头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // headers: {
  //   // Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('heimatoutiao')).token
  // }
})

// 请求拦截
instance.interceptors.request.use(confing => {
  const user = window.sessionStorage.getItem('heimatoutiao')
  if (user) {
    confing.headers = {
      Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('heimatoutiao')).token
    }
  }
  return confing
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    // hash是url后#开始的字符串
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance
