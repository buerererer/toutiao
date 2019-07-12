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
        mobile: '',
        code: ''
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
    login () {
      // 校验整个表单
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 提交登录请求
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
            //   res是响应对象
            // 1、跳转到首页
            this.$router.push('/')
            // 2、保存用户信息 用来判断登录状态（token）
          }).catch(() => {
            // 提示错误
            this.$message.error('手机号或验证码错误')
          })
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
