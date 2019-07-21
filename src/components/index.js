import MyBread from './my-bread.vue'
import MyChannel from './my-channel.vue'
import MyImage from './my-image.vue'
import Test1 from './test1.vue'
import Test2 from './test2.vue'
export default {
  install (Vue) {
    //   注册组件
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
    // 测试使用
    Vue.component(Test1.name, Test1)
    Vue.component(Test2.name, Test2)
  }
}
