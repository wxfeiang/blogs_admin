<template>
<div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">登录</h1>
          <p class="lead text-center">使用已有的账户登录</p>
          <form @submit.prevent="submit" autocomplete="off" method="post ">
            <!-- <div class="form-group">
              <input 
                type="email" 
                class="form-control form-control-lg" 
                placeholder="邮箱地址" 
                name="email" 
                v-model="user.email"
               :class="{'is-invalid': errors.email}"
              />
              <div v-if="errors.email" class="invalid-feedback">
            {{errors.email}}
              </div>
            </div>

            <div class="form-group">
              <input 
                type="password" 
                class="form-control form-control-lg" 
                placeholder="密码" 
                name="password" 
                v-model="user.password"
             :class="{'is-invalid': errors.password}"
              />
              <div v-if="errors.password" class="invalid-feedback">
              {{errors.password}}
              </div>
            </div>  -->
            <!-- 通用组件分装调用 父子传值 -->
            <TextField 
            type='email'name='email'
              placeholder="邮箱地址"
               v-model="user.email" 
               :error='errors.email'
               />
            <TextField 
              type='password'
              name='password'
              placeholder="密码"
              v-model="user.password"
              :error='errors.password'
          />



            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Footer from "@/components/Footer";
import jwt_decode from "jwt-decode";
import TextField from "./common/TextFieldGroup";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errors: ""
    };
  },
  components: {
    TextField
  },
  methods: {
    submit() {
      this.$axios
        .post("/api/users/login", this.user)
        .then(res => {
          this.errors = ""; // 清空页面错误信息
          //console.log(res.data);
          // 存储 token  localStorge
          const { token } = res.data; //  ===  const token= res.data.token;   解构
          window.localStorage.setItem("jwtToken", token);
          // 设置请求头 actions
          // 解析token
          const decoded = jwt_decode(token);
          //console.log(decoded);
          //分发 actions并更改state  true 传入
          this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
          // decoded 有值  验证返回false
          this.$store.dispatch("setUser", decoded);

          // 页面跳转
          this.$router.push("/dashboard");
          //登录以后刷新 继续保持 localStorage
        })
        .catch(err => {
          // if (err.response) {
          //   //console.log(err.response.data);
          //   this.errors = err.response.data;
          // }
          return (this.errors = err.response ? err.response.data : "");
        });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
        // 返回false
      );
    }
  }
};
</script>

<style scoped>
</style>