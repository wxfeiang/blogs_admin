<template>
   <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div class="container">
      <!-- <a class="navbar-brand" href="landing.html">米修在线</a> -->
      <router-link to='/' class="navbar-brand">米修在线</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <!-- <a class="nav-link" href="profiles.html"> 开发者
            </a> -->
            <router-link to='/profiles' class="nav-link" v-show="isLogin">开发者</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <!-- <a class="nav-link" href="login.html">留言</a> -->
            <router-link to='/feed' class="nav-link" v-show="isLogin">留言</router-link>
          </li>
          <li class="nav-item">
            <router-link to='/dashboard' class="nav-link" v-show="isLogin">Dashboard</router-link>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link to='/register' class="nav-link">注册</router-link> 
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link to='/login' class="nav-link">登录</router-link> 
            <!-- <a class="nav-link" href="login.html">登录</a> -->
          </li>
          <li  class="nav-item" v-if="user != null" v-show="isLogin">
            <a class="nav-link btn"  @click.prevent="logout" to="/login">
              <img  class="rounded-circle headerImg":src="user.avatar" :alt="user.name">
              退出
              </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  computed: {
    // 判断是否登录 授权 getters.js

    isLogin() {
      // if (this.$store.getters.isAutnenticated) {
      //   return true;
      // } else {
      //   return false;
      // }
      return this.$store.getters.isAutnenticated ? true : false;
    },
    user() {
      //console.log(this.$store.getters.user);
      return this.$store.getters.user;
    }
  },
  methods: {
    //点击退出
    logout() {
      //删除localStorage
      localStorage.removeItem("jwtToken");
      // 删除请求头 改变 actions 状态
      // this.$store.dispatch("setIsAutnenticated", false);
      //清空user
      //this.$store.dispatch("setUser", {});

      this.$store.dispatch("clearCurrentState");
      //跳转登录
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.headerImg {
  width: 25px;

  margin-right: 5px;
}
</style>

