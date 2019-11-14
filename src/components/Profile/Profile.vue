<template>
    <div class="profile">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <a class="btn btn-light mb-3 float-left"
            @click.prevent="$router.go(-1)">返回个人信息</a>
          </div>
        </div>
        <!--  有内容 绑定传值 -->
        <ProfileHeader 
            v-if="profile" 
            :profile='profile'
        ></ProfileHeader>

        <ProfileAbout 
            v-if="profile" 
            :profile='profile'
        ></ProfileAbout>

        <ProfileCreds 
            v-if="profile && (profile.education || profile.experience)"
            :experience="profile.experience"
            :education="profile.education"
        ></ProfileCreds>

        <ProfileGithub 
            v-if="profile && profile.githubusername" 
            :username='profile.githubusername'
        ></ProfileGithub>
      </div>
       
    </div>
</template>

<script>
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";

export default {
  name: "Profile",
  data() {
    return {
      profile: null
    };
  },
  components: {
    ProfileHeader,
    ProfileAbout,
    ProfileCreds,
    ProfileGithub
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //  to.params.handle  拿到handle
      vm.getProfileByHandle(to.params.handle);
    });
  },
  methods: {
    getProfileByHandle(handle) {
      //  console.log(handle);
      this.$axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => {
          this.profile = res.data;
          //https://github.com/settings/applications/new  git  线上仓库
          console.log(this.profile.githubusername);
        })
        .catch(error => {
          this.profile = null;
          //console.log(error.response.data);
        });
    }
  }
};
</script>

