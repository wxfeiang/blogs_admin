<template>
     <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">注册</h1>
          <p class="lead text-center">创建新的账户</p>
          <!-- 不记录之前内容 -->
          <form @submit.prevent='submit' autocomplete="off" method="post">
             <!-- <div class="form-group">
            <input 
              type='text'
              name='name'
                 class="form-control form-control-lg" 
              placeholder="用户名"
              v-model="newUser.name"
               :class="{'is-invalid': errors.name}"

           /> <div v-if="errors.name" class="invalid-feedback">
                 {{errors.name}}
              </div> 
             </div>
             
              <div class="form-group">
           <input 
              type='email'
              name='email'
                 class="form-control form-control-lg" 
              placeholder="邮箱地址"
              v-model="newUser.email"
               :class="{'is-invalid': errors.email}"
              
           />
           <div v-if="errors.email" class="invalid-feedback">
                 {{errors.email}}
              </div> 
            </div>
              <div class="form-group">
           <input 
              type='password'
              name='password'
                 class="form-control form-control-lg" 
              placeholder="密码"
              v-model="newUser.password"
               :class="{'is-invalid': errors.password}"
           />
           <div v-if="errors.password" class="invalid-feedback">
                 {{errors.password}}
              </div> 
            </div>
              <div class="form-group">
           <input 
              type='password'
              name='password2'
                 class="form-control form-control-lg" 
              placeholder="确认密码"
              v-model="newUser.password2"
               :class="{'is-invalid': errors.password2}"
             
           />
            <div v-if="errors.password2" class="invalid-feedback">
                 {{errors.password2}}
              </div>
            </div> -->
              
           <TextField 
              type='text'
              name='name'
              placeholder="用户名"
              v-model="newUser.name"
              :error='errors.name'
           />
           <TextField 
              type='email'
              name='email'
              placeholder="邮箱地址"
              v-model="newUser.email"
              :error='errors.email'
              info='我们使用了gravatar全球公认头像, 如果需要有头像显示, 请使用在gravatar注册的邮箱'
            />
           <TextField 
              type='password'
              name='password'
              placeholder="密码"
              v-model="newUser.password"
              :error='errors.password'
            />
           <TextField 
              type='password'
              name='password2'
              placeholder="确认密码"
              v-model="newUser.password2"
              :error='errors.password2'
           />
          
            <input type="submit"  class="btn btn-info btn-block mt-4" />
          </form> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "./common/TextFieldGroup";
export default {
  name: "Register",
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: {}
    };
  },
  components: {
    TextField
  },
  methods: {
    submit() {
      this.errors = ""; // 清空页面错误信息
      // 获取当前得状态
      // console.log(this.$store.getters.isAutnenticated);
      // 拿 获取到得所有信息
      this.$axios
        .post("/api/users/register", this.newUser)
        .then(res => {
          // console.log(res.data);
          //执行mutation 把信息发到
          //this.$store.commit("setUser", res.data);  同步执行得
          // 执行 actions  异步操作
          this.$store.dispatch("setUser", res.data);
          this.$router.push("/login");
        })
        .catch(err => {
          // if (err.response) {
          //   // 注册成功防止报错
          //   //  console.log(err.response.data);
          //   this.errors = err.response.data;
          // }
          return (this.errors = err.response ? err.response.data : "");
        });
    }
  }
};
</script>

<style scoped>
</style>