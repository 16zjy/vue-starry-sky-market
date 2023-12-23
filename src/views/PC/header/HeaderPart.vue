<template>
  <header id="header">
    <div id="content">
      <span>
        <div class="inline-block pointer" @click="toPage('/PC/index')">
          <i class="el-icon-s-home" style="color: #79bbff"></i>
          <span style="font-size: 14px">江苏</span>
        </div>
      </span>
      <span class="rightLink">
        <template v-if="this.$store.state.userInfo === null">
          <el-link @click="toPage('/PC/login?isLogin=true')" :underline="false"
            >您好，请先登录
          </el-link>
          <el-link
            @click="toPage('/PC/login?isLogin=false')"
            type="primary"
            :underline="false"
          >
            免费注册
          </el-link>
        </template>
        <template v-else style="font-size: 12px">
          <el-link :underline="false">
            <span> 尊敬的用户: </span>
            <span>{{
              this.$store.state.userInfo.name ||
              this.$store.state.userInfo.username
            }}</span>
          </el-link>
          <el-link @click="logout" type="primary" :underline="false">
            退出登录
          </el-link>
        </template>
        <span class="div"> | </span>
        <el-link :underline="false" @click="toPage('/PC/cart')">
          购物车
        </el-link>
        <span class="div"> | </span>
        <el-link :underline="false" @click="toIndex()">商城首页</el-link>
      </span>
    </div>
  </header>
</template>
 
<script>
import Cookies from 'js-cookie';
export default {
  name: 'HeaderPart',
  methods: {
    toIndex() {
      if (this.$route.path === '/PC/index') {
        this.$message({
          type: 'info',
          message: '尊敬的用户，您当前正在首页。',
          showClose: true,
        });
      } else {
        this.$router.push('/PC/index');
      }
    },
    toPage(item) {
      // console.log(item);
      this.$router.push(item);
    },
    logout() {
      this.$store.state.userInfo = null;
      Cookies.remove('isLogin');
    },
  },
};
</script>

<style scoped>
#header span {
  color: #999;
  /* font-size: 14px; */
}
#header {
  width: 100%;
  height: 25px;
  background-color: #e3e4e8;
  /* background-color: #F2F6FC; */
  padding: 0 0;
}
#content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
}
.rightLink {
  position: absolute;
  right: 0;
}
</style>