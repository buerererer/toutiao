<template>
  <div class="image" v-loading="loadding">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <!-- 按钮式的单选框 -->
        <el-radio-group @change="search()" size="small" v-model="reqParams.collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button @click="dialogVisible=true" size="small" style="float:right" type="success">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="imglist">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot" v-if="!reqParams.collect">
            <span
              @click="toggleFav(item)"
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
            ></span>
            <span @click="delimage(item)" class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-upload
        :headers="headers"
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 列表数据
      images: [],
      // 加载数据
      loadding: false,
      // 总条数
      total: 0,
      // 添加素材相关数据
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('heimatoutiao')).token
      }
    }
  },
  created () {
    // 获取素材列表数据
    this.getimages()
  },
  methods: {
    // 删除图片素材
    delimage (item) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete('user/images/' + item.id)
          // 提示成功
          this.$message.success('删除成功')
          // 更新列表
          this.getimages()
        })
        .catch(() => {})
    },
    // 收藏与取消收藏
    async toggleFav (item) {
      const {
        data: { data }
      } = await this.$http.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 提示成功
      this.$message.success('操作成功')
      // 将当前状态改成操作后的状态
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      // 预览两秒钟，提示上传成功
      this.imageUrl = res.data.url // 绑定的图片地址，若有则显示，没有则隐藏
      this.$message.success('上传成功')
      // 一次性定时器
      window.setTimeout(() => {
        // 2s后关闭对话框，更新素材列表
        this.dialogVisible = false
        this.getimages()
        // 注意：再次打开对话框的时候，预览的是上传按钮，而不是之前的图片
        // this.imageUrl = null
      }, 2000)
    },
    // 分页
    pager (newpage) {
      // 发送请求之前将传输给后台的页码改成当前页码
      this.reqParams.page = newpage
      this.getimages()
    },
    search () {
      this.reqParams.page = 1
      // 获取素材列表数据
      this.getimages()
    },
    async getimages () {
      // 开启加载
      this.loadding = true
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      //   console.log(data)
      // 获取数据成功
      this.images = data.results
      // 成功后设置总条数
      this.total = data.total_count
      // 关闭加载
      this.loadding = false
    }
  }
}
</script>
<style scope lang='less'>
.imglist {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    position: relative;
    width: 160px;
    height: 160px;
    border: 1px solid #ddd;
    float: left;
    margin-right: 50px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);

      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
