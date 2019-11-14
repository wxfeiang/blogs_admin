// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router"; // 自己得路由配置组件
//import axios from "axios";
import axios from "./utils/http"; // 模块化请求头
import store from "./store"; // 状态你管理组件
Vue.prototype.$axios = axios; // 全局实例配置
Vue.config.productionTip = false;

// this.$axios
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,

  components: { App },
  template: "<App/>"
});
