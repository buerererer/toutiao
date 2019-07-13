// // 配置axios
import axios from 'axios'

const instance = axios.create({
//   // 配置对象 基准路径，头部信息
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('heimatoutiao')).token
  }
})

export default instance
