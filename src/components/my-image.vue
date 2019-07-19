<template>
  <div class="imagebtn">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="open">
      <img :src="value || deflateimg" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框 -->
          <div>
            <el-radio-group size="small" v-model="reqParams.collect" @change="search()">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
            class="img-item"
            :class="{selected:selectedimgurl===item.url}"
            @click="selectedimg(item.url)"
            v-for="item in images"
            :key="item.id"
          >
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <!-- v-if='total>reqParams.per_page' -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            name="image"
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            :headers='headers'
          >
            <img v-if="uploadimageUrl" :src="uploadimageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="confirmimg" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { deflate } from 'zlib'

import deflateimg from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取列表时的传参
      reqParams: { collect: false, page: 1, per_page: 8 },

      // 上传图片后预览的地址
      uploadimageUrl: null,
      // 素材列表数据
      images: [],
      // 总条数
      total: 0,
      // 你选中的素材地址
      selectedimgurl: null,
      // 头部数据
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('heimatoutiao')).token
      },
      // 选中的图片，默认图片
      // 注意：webpack不会打包在数据中对应的地址对应的资源，会打包标签时src和url的资源
      // 注意：本地资源不会去打包，如果是网络资源就没关系
      // value: deflateimg
      deflateimg
    }
  },
  props: ['value'],
  methods: {
    open () {
      this.dialogVisible = true
      // 清除上一次的数据
      this.selectedimgurl = null
      this.uploadimageUrl = null
      this.getimages()
    },
    async getimages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    search () {
      this.reqParams.page = 1
      this.getimages()
      //   console.log(444)
    },
    pager (newpage) {
      this.reqParams.page = newpage
      this.getimages()
    },
    // 选中图片
    selectedimg (url) {
      // 思路：:class='{selected:条件}'
      // 条件：记录当前点击图片的唯一标识，然后比对每次遍历的图片的唯一标识
      // 如果一致则选中，反之不选中
      // 此时图片地址作为唯一标识  将来提交的数据是地址不是id
      this.selectedimgurl = url
    },
    // 上传成功的方法
    handleSuccess (res) {
      // 预览
      this.uploadimageUrl = res.data.url
    },
    // 确认图片
    confirmimg () {
      // 如果是上传图片 使用 uploadimageUrl
      if (this.activeName === 'image') {
        // 如果是素材 使用selectedimgurl
        if (!this.selectedimgurl) return this.$message.warning('请选择数据')
        // this.value = this.selectedimgurl
        this.$emit('input', this.selectedimgurl)// 将数据传递给父组件，通知父组件更改
      } else {
        if (!this.uploadimageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadimageUrl
        this.$emit('input', this.uploadimageUrl)
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scope lang='less'>
.imagebtn{
  display: inline-block;
  margin-right: 20px;
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img-item {
  width: 150px;
  height: 120px;
  border: 1px solid #ddd;
  margin-right: 10px;
  display: inline-block;
  position: relative;
  &.selected {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center/50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    //作用：图片填充的规则，等比例缩放，且完整显示在容器内
    object-fit: contain;
  }
}
</style>
