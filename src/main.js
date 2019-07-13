import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

// 1、默认索引知识，文件下，如果存在index.js,index.vue,index.json  默认加载，优先级如前面的书写顺序
// 2、在使用vue-cli的时候，@符号在路径中作为前缀使用的时候，代表src目录
import router from '@/router'

import axios from 'axios'
// import axios from '@api/axios'
// 基准路径
// axios.defaults.baseURL = ''
// // token认证
// axios.defaults.headers = {
//   Authorization: 'Bearer ' + window.sessionStorage.getItemTem('heimatoutiao').token
// }
Vue.prototype.$http = axios

Vue.use(Element)

Vue.config.productionTip = false

// main.js职责
// 职责一：导入项目需要依赖的资源（css）
// 职责二：初始化根实例（new vue创建实例，选项render作用：把某一个组件（app）渲染在指定容器$mount('#app')内）

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
