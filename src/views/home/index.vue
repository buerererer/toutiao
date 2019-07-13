<template>
  <el-container id="home">
    <el-aside class="my-side" :width="iscollapse? '64px':'200px'">
      <div class="logo" :class="{close: iscollapse}"></div>
      <!-- 菜单容器
      default-active 默认激活菜单样式 通过指定菜单项的index的值去激活样式
      active-text-color激活的时候字体颜色
      -->
      <el-menu
        router
        :collapse-transition="false"
        :collapse="iscollapse"
        style="border-right:none"
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- el-submenu 有下一级菜单的容器-->
        <!-- el-menu-item 没有下一级菜单的容器-->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span @click="toggleMenu" class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客教育有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <!-- 下拉菜单 -->

            <img
              style="vertical-align: middle"
              width="30"
              height="30"
              src="../../assets/images/avatar.jpg"
              alt
            />
            <b style="vertical-align: middle;padding-left:5px">黑马小哥</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      iscollapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.iscollapse = !this.iscollapse
    }
  }
}
</script>

<style scope lang='less'>
#home {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-side {
    // width: 200px;
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #024 url(../../assets/images/logo_admin.png) no-repeat
        center/140px auto;
    }
    .close {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    // vertical-align: middle;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
  .my-main {
  }
}
</style>
