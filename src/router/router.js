import Vue from 'vue'
import Router from 'vue-router' // 引入vue-router
import Login from '../components/Login.vue'
import Register from "../components/Register.vue"
import AdminLogin from '../components/AdminLogin.vue'
import Admin from '../components/Admin.vue'
import CSRFrom  from '../components/CSRFrom.vue'
import UserCenter from "../components/UserCenter.vue"
Vue.use(Router) //使用vue-router

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/csr",
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/admin_login",
      name: "admin_login",
      component: AdminLogin,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/csr",
      name: "csr",
      component: CSRFrom,
    },
    {
      path: "/user",
      name: "user",
      component: UserCenter,
    },
  ],
});