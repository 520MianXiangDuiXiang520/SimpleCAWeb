import Vue from 'vue';
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI, axios);

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data["header"]["code"] != 200) {
    console.log(response.data["header"])
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

new Vue({
  el: '#app',
  render: h => h(App)
});