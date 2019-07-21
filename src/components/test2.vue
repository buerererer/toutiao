<template>
  <div class='container'>test2------{{bdata}}</div>
</template>

<script>
import eventBus from '../eventBus'
export default {
  data () {
    return {
      bdata: ''
    }
  },
  name: 'test2',
  created () {
  },
  mounted () {
    // 绑定事件，接收数据
    eventBus.$on('froma', (data) => {
      this.bdata = data
    })
  }
}
</script>

<style scoped lang='less'></style>
