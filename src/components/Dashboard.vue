<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12" >
            <h1 class="display-4">Dashboard</h1>
            <p class="lead text-muted" v-if="user !==null" >
              Welcome 
           
             <!-- 没有数据 -->
             <router-link  v-if="profile == null" to="/profiles"> 
              {{user.name}}
             </router-link>
             <!-- 有数据跳转 -->
              <router-link v-else :to="`/profile/${profile.handle}`">
                {{user.name}}
              </router-link>
              </p>
              <div v-if="profile != null">
                 <!-- 路由按钮 -->
                 <!-- 编辑个人信息 -->
              <ProfileActived/>
              <!--  个人经历  已经获取到得值    父组件调用子组件方法  -->
              <Experience
                 :experience="profile.experience"
              @deleteExperience= "deleteExperience"
              ></Experience>
              
              <!-- 教育经历 -->
              <Education
                :education="profile.education"
                @deleteEducation="deleteEducation"
              ></Education>
                   <!-- 删除账户按钮 -->
              <div style="margin-bottom: 60px;">
                <button class="btn btn-danger"@click="deleteClick" >
                  删除当前账户
                </button>
              </div>
              </div>
              <div v-else>
                <p>没有任何个人信息,请添加</p>
                <router-link to="/create-profile" class="btn btn-lg btn-info">添加个人信息</router-link>


            
              </div>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileActived from "./common/ProfileActived";
import Experience from "./common/Experience";
import Education from "./common/Education";

export default {
  name: "Footer",
  data() {
    return {
      profile: null
    };
  },
  components: {
    ProfileActived,
    Experience,
    Education
  },
  methods: {
    getProfileData() {
      this.$axios
        .get("api/profile")
        .then(res => {
          //console.log(res.data);
          this.profile = res.data;
          // 更新store
          this.$store.dispatch("setProfile", res.data);
        })
        .catch(err => {
          //console.log(err.response);
          this.profile = null;
          // 更新store
          this.$store.dispatch("setProfile", null);
        });
    },
    deleteClick() {
      // 删除当前账户
      this.$axios
        .delete("/api/profile")
        .then(res => {
          this.profile = null;
          // 更新store
          this.$store.dispatch("clearCurrentState");
          this.$router.push("/login");
        })
        .catch(error => {
          alert(error.response.data);
        });
    },
    // 
    deleteExperience(id) {
      this.$axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => {
          // console.log(res.data);
          this.profile = res.data;
        })
        .catch(error => {});
    },
    deleteEducation(id) {
      this.$axios
        .delete(`/api/profile/education/${id}`)
        .then(res => {
          // console.log(res.data);
          this.profile = res.data;
        })
        .catch(error => {});
    }
  },
  beforeRouteEnter(to, from, next) {
    // 进入组件之前
    next(vm => {
      vm.getProfileData();
    });
  },
  created() {
    // 登录成功请求个人数据
    // this.getProfileData();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>
</style>