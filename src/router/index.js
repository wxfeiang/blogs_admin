import Vue from "vue";
import Router from "vue-router"; // 框架
// 引入路由组件
import Landing from "@/components/Landing";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Dashboard from "@/components/Dashboard";
import CreateProfile from "@/components/CreateProfile";
import EditProfile from "@/components/EditProfile";
import AddExperience from "@/components/AddExperience";
import AddEducation from "@/components/AddEducation";
// 展示开发者信息
import Profiles from "@/components/Profiles";
import Profile from "@/components/Profile/Profile";
// 评论组件
import Posts from '@/components/Posts/Posts'
import Post from '@/components/Posts/Post'

Vue.use(Router);

// 需要守卫  实例
const route = new Router({
  mode: "history",
  linkActiveClass: "active", // 路由激活状态
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", name: "Landing", component: Landing },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    {
      path: "/create-profile",
      name: "CreateProfile",
      component: CreateProfile
    },
    { path: "/edit-profile", name: "EditProfile", component: EditProfile },
    {
      path: "/add-experience",
      name: "AddExperience",
      component: AddExperience
    },

    { path: "/add-education", name: "AddEducation", component: AddEducation },
    { path: "/profiles", name: "profiles", component: Profiles },
    { path: '/profile/:handle', name: 'profile', component: Profile },
 
    { path: '/feed', name: 'feed', component: Posts },
    { path: '/post/:id', name: 'post', component: Post },
  ]
});
// 添加路由守卫
route.beforeEach((to, from, next) => {
  const isLogin = localStorage.jwtToken ? true : false;
  // console.log(isLogin)
  if (to.path == "/login" || to.path == "/register" || to.path == "/") {
    next();
    // 没有登录 访问得路径
  } else {
    // 存在 正常访问
    isLogin ? next() : next("/login");
  }
});

export default route;
