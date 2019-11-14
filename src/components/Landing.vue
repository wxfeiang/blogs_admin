<template>
    <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1 class="display-3 mb-4">个人社交网络平台
            </h1>
            <p class="lead"> 专注于对技术得执着!!!! </p>
            <hr />
            <!-- <a href="register.html" class="btn btn-lg btn-info mr-2">注册</a>
            <a href="login.html" class="btn btn-lg btn-light">登录</a>  -->
            <router-link to='/register' class="btn btn-lg btn-info mr-2" v-show="!isLogin">注册</router-link>
            <router-link  to='/login' class="btn btn-lg btn-light " v-show="!isLogin">登录</router-link>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
  data() {
    return {};
  },
  computed: {
    // 判断是否登录 授权 getters.js

    isLogin() {
      if (this.$store.getters.isAutnenticated) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}

.landing {
  position: relative;
  background: url("../asserts/showcase.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  margin-top: -24px;
  margin-bottom: -50px;
}

.landing-inner {
  padding-top: 80px;
}

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-form {
  opacity: 0.9;
}

.latest-profiles-img {
  width: 40px;
  height: 40px;
}

.form-control::placeholder {
  color: #bbb !important;
}
</style>
