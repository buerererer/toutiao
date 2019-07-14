<template>
  <div id="login">
    <!-- login -->
    <el-card class="login-box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :status-icon='true' ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop='mobile'>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input style='width:240px' v-model="loginForm.code" placeholder="请输入验证码"></el-input>
          <el-button style='float:right'>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox checked>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <el-card></el-card> -->
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = function (rule, value, callback) {
      // 逻辑校验
      // 把value拿出来进行手机号格式校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      loginForm: {
        mobile: '17780734515',
        code: '246810'
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // login () {
    //   // 校验整个表单
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       // 提交登录请求
    //       this.$http.post('authorizations', this.loginForm).then(res => {
    //         //   res是响应对象
    //         // 1、跳转到首页
    //         // 2、保存用户信息 用来判断登录状态（token）
    //         // sessionStorage BOM对象，全局对象，作用是保存数据
    //         // 是有有效期的，当关闭浏览器之后就失效
    //         // sessionStorage.setItem(key,value)缓存数据 value字符串
    //         // sessionStorage.getItem(key)获取数据
    //         // sessionStorage.removeItem(key)删除数据
    //         // sessionStorage.clear()清空所有数据
    //         window.sessionStorage.setItem('heimatoutiao', JSON.stringify(res.data.data))
    //       }).catch(() => {
    //         // 提示错误
    //         this.$message.error('手机号或验证码错误')
    //       })
    //     }
    //   })
    // }
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 发送promise请求
          // try{业务逻辑}catch(err){处理错误}
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('heimatoutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scope lang='less'>
#login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  //  cover铺满容器，多于的裁剪 contain 在容器内完全显示图片
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .login-box {
    width: 400px;
    height: 330px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
