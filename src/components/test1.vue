<template>
  <div class="container">test1---<button @click="fn">发数据</button>
  <!-- <div class='container'>my-coma---<button @click="fn">给B数据</button></div> -->
  </div>

</template>

<script>
import eventBus from '../eventBus'
export default {
  name: 'test1',
  data () {
    return {
      a: 'test1的数据'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('froma', this.a)
    }
  }
}
</script>

<style scoped lang='less'></style>
