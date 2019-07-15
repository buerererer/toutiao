<template>
  <div id="article">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <!-- 面包屑导航、路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 筛选表单 -->
        <!-- <el-form :model="reqParams" size="small" label-width='80px'> -->
        <el-form :model="reqParams" size="small" label-width="80px">
          <el-form-item label="状态：">
            <el-radio-group v-model="reqParams.status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="1">草稿</el-radio>
              <el-radio :label="2">待审核</el-radio>
              <el-radio :label="3">审核通过</el-radio>
              <el-radio :label="4">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <el-select v-model="reqParams.channel_id" placeholder="请选择">
              <el-option
                v-for="item in channelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="日期：">
              <el-date-picker
                v-model="dateValues"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">筛选</el-button>
            </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">结果</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的筛选条件数据
      reqParams: {
        status: null,
        channel_id: '',
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的选项数组
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期数据
      dateValues: []
    }
  }
}
</script>

<style scope lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
