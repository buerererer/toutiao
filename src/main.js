import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// main.js职责
// 职责一：导入项目需要依赖的资源（css）
// 职责二：初始化根实例（new vue创建实例，选项render作用：把某一个组件（app）渲染在指定容器$mount('#app')内）

new Vue({
  render: h => h(App)
}).$mount('#app')
