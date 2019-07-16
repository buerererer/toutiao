import MyBread from './my-bread.vue'
export default {
  install (Vue) {
    //   注册组件
    Vue.component(MyBread.name, MyBread)
  }
}
