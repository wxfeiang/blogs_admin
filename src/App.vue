<template>
  <div id="app">
 
   <NavBar />
   <!-- 缓存池 -->
    <keep-alive>
        <!-- <Landing></Landing> -->
        <router-view></router-view>
    </keep-alive>
  
   <Footer/>
   <Loading v-show="loading"/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";
import Loading from "@/components/common/loading";
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  components: {
    NavBar,
    Landing,
    Footer,
    Loading
  },
  created() {
    // 有token
    if (localStorage.jwtToken) {
      // 解析token
      const decoded = jwt_decode(localStorage.jwtToken);

      // 获取当前时间 解决token 过期问题
      const currentTime = Date.now() / 1000; //
      //检测 token 是否过期
      if (decoded.exp < currentTime) {
        //过期分发状态
        // this.$store.dispatch("setIsAutnenticated", false);

        // this.$store.dispatch("setUser", {});

        this.$store.dispatch("clearCurrentState");
        this.$router.push("/login");
      }

      //分发状态
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
      // decoded 有值  验证返回false
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
        // 返回false
      );
    }
  },
  computed: {
    loading() {
      this.$store.getters.loading;
    }
  }
};
</script>

<style>
</style>
