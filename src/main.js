import '@babel/polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'
import router from './router/router.js'
import './plugins/element.js'
import cookie from 'vue-cookies'
import { Message } from "element-ui";
import jsrsasign from 'jsrsasign'
Vue.prototype.RSA = jsrsasign;

// cookie.config("1d", "/", "39.106.168.39")

Vue.prototype.$cookie = cookie;
// axios.defaults.withCredentials = true

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080/api/';
// axios.defaults.baseURL = 'http://39.106.168.39:82/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.prototype.$axios = axios
Vue.prototype.$message = Message

axios.interceptors.response.use(function (response) {
  console.log(response)
  if(response.data['header']['code'] != 200) {
    Message.error(response.data['header']['msg'])
  }
  return response;
}, function (error) {
  if (error.response.status == 401) {
    Message.error("您还没有登录呢！")
  } else if (error.response.status == 403) {
    Message.error("您貌似没有这项权限！")
  } else {
    Message.error("请求服务失败，请检查您的网络连接！")
  }

  return Promise.reject(error);
});

Vue.use(vueAxios, axios, ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

