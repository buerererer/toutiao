<template>
  <el-container id="home">
      <el-side class='my-side'>side</el-side>
    <el-container>
        <el-header class='my-header'>
            <span class='el-s-icon-fold'></span>
            <span class='text'>江苏传智</span></el-header>
        <el-main class='my-main'>main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scope lang='less'>
#home {
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    .my-side {
        background-color: #002033;
    }
    .my-header {
        border-bottom : 1px solid #ddd
        // background-color: #002033;
    }
    .my-main {
        // background-color: blue;
    }
}
</style>
