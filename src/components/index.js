import MyBread from './my-bread.vue'
import MyChannel from './my-channel.vue'
export default {
  install (Vue) {
    //   注册组件
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
