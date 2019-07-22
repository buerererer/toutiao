<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm" label-width="120px">
            <el-form-item label="编号：">{{userForm.id}}</el-form-item>
            <el-form-item label="手机：">{{userForm.mobile}}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="媒体邮箱">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="uploaduserinfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action
            :http-request="uploadphoto"
            :show-file-list="false"
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      userForm: {
        name: null,
        intro: null,
        email: null,
        id: null,
        mobile: null,
        photo: null
      },
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('heimatoutiao')).token
      }
    }
  },
  created () {
    // 获取用户个人信息
    this.getuserinfo()
  },
  methods: {
    uploadphoto (data) {
      // data包含图片对象，data.file获取
      //   console.log(data)
      const formdata = new FormData()
      formdata.append('photo', data.file)
      this.$http.patch('user/photo', formdata).then(res => {
        // 上传成功  res.data.data.photo
        this.$message.success('修改成功')
        // 更新home组件头像
        this.userForm.photo = res.data.data.photo
        eventBus.$emit('updataheaderptoto', res.data.data.photo)
        // 更新本地存储头像
        const user = JSON.parse(window.sessionStorage.getItem('heimatoutiao'))
        user.photo = res.data.data.photo
        window.sessionStorage.setItem('heimatoutiao', JSON.stringify(user))
      })
    },
    // ok (res) {
    //   // 405，请求方式不对，el-upload默认发送post请求，且只能发送post请求
    //   console.log(res.data.photo)
    // },
    async uploaduserinfo () {
      const {
        data: { data }
      } = await this.$http.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改成功')
      console.log(data)
      // 传当前修改的用户名称给home组件   修改home的数据 用户名称
      eventBus.$emit('updateheadername', data.name)
      // 更新本地的用户名称
      const user = JSON.parse(window.sessionStorage.getItem('heimatoutiao'))
      user.name = data.name
      window.sessionStorage.setItem('heimatoutiao', JSON.stringify(user))
    },
    async getuserinfo () {
      const {
        data: { data }
      } = await this.$http.get('user/profile')
      this.userForm = data
    }
  }
}
</script>

<style scoped lang='less'></style>
