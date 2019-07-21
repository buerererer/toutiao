<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 列表 -->
      <el-table :data="comments">
        <el-table-column label="标题" widtd="400" prop="title"></el-table-column>
        <el-table-column label="评论总数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status? '正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="togglesStatus(scope.row)"
              v-if="!scope.row.comment_status"
              type="success"
              size="mini"
            >打开评论</el-button>
            <el-button size="mini" @click="togglesStatus(scope.row)" v-else type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
        :total="total"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      // 参数
      reqParams: {
        page: 1,
        per_page: 30,
        response_type: 'comment'
      },
      total: null
    }
  },
  created () {
    this.getcomments()
  },
  methods: {
    // 改变文字评论状态
    togglesStatus (row) {
      const txt1 = '确认打开评论功能吗？'
      const txt2 = '确认关闭评论功能吗？'
      this.$confirm(row.comment_status ? txt2 : txt1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put('comments/status?article_id=' + row.id, { allow_comment: !row.comment_status })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        // this.getcomments()
        // 修改数据驱动视图更新
        row.comment_status = data.allow_comment
      }).catch(() => {
      })
    },
    pager (newpage) {
      this.reqParams.page = newpage
      this.getcomments()
      //   console.log(1)
    },
    async getcomments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })

      this.comments = data.results
      // console.log(this.comments)
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'></style>
