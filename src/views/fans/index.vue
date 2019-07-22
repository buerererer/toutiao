<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activename" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-item" v-for="item in fans" :key="item.id">
            <el-avatar :size="80" :src="item.photo"></el-avatar>
            <p style="font-size:12px">{{item.name}}</p>
            <el-button plain type="primary" size="mini">+ 关注</el-button>
          </div>
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">
          <div ref='bar' style='width:600px;height:400px'></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20
      },
      activename: 'list',
      fans: [],
      total: 0
    }
  },
  created () {
    this.getfanslist()
  },
  mounted () {
    // 绘制图表
    this.drawcharts()
  },
  methods: {
    drawcharts () {
      const dom = this.$refs.bar
      const myecharts = echarts.init(dom)
      // 是什么图表就参考其对应的配置
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      myecharts.setOption(option)
    },
    pager (newpage) {
      this.reqParams.page = newpage
      this.getfanslist()
    },
    // 获取粉丝列表数据
    async getfanslist () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fans = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.fans-item {
  text-align: center;
  width: 120px;
  height: 160px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
