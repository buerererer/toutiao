<template>
  <div id="article">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header">
        <!-- 面包屑导航、路径导航 -->
        <my-bread>文章管理</my-bread>
      </div>
      <!-- 筛选表单 -->
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
          <my-channel @input="fn">子组件在父组件中使用</my-channel>
          {{reqParams.channel_id}}
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changedata"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          {{dateValues}}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b>条结果
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" style="width:100px;height:75px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title">
          <!-- <template slot-scope="scope">
            {{scope.row.title}}
          </template>-->
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row.id}} -->
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="primary" plain icon="el-icon-edit" circle></el-button>
            <el-button @click="del(scope.row.id)" type="danger" plain icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="pager"
        class="box"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的筛选条件数据
      reqParams: {
        per_page: 30,
        page: 1,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 日期数据
      dateValues: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getarticle()
  },
  methods: {
    fn (data) {
      // console.log(data)
      this.reqParams.channel_id = data
    },
    // 编辑页面传参跳转
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // 若删除失败，下面的代码不会执行
          this.$message.success('删除成功！')
          // 更新文章列表
          this.getarticle()
        })
        .catch(() => {}) // 点击取消不做任何操作
    },
    // 分页功能
    // 页码改变时触发该函数，函数参数为改变的新页码
    pager (newpage) {
      // 在获取文章列表时将新的页码一起传给后台
      this.reqParams.page = newpage
      this.getarticle()
    },
    // 搜索功能
    async search () {
      // 搜索之前将页码改成第一页
      this.reqParams.page = 1
      this.getarticle()
    },
    // 选择的时间的处理函数
    changedata (values) {
      // 此处的values值是触发函数时自动传入的一个数据，与绑定在时间控件上的值一致
      this.begin_pubdate = values[0]
      this.end_pubdate = values[1]
    },

    // 获取文章列表
    async getarticle () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // console.log(data)
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scope lang='less'>
.el-card {
  margin-bottom: 20px;
}
.el-pagination {
  text-align: center;
}
</style>
