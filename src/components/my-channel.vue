<template>
  <el-select @change='top' :value='value' placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      res: '来自子组件的数据',
      channelOptions: []
    }
  },
  created () {
    this.getoptions()
  },
  methods: {
    top (value) {
      this.$emit('input', value)
      // console.log(value)
    },
    // 获取频道数据
    async getoptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // console.log(data)
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>
</style>
