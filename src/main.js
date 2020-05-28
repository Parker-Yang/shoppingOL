// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';
// import axios from 'axios'
// import '@/utils/http'
import animated from 'animate.css';
Vue.use(animated)
Vue.use(ElementUI);
Vue.prototype.$http = Axios
// Vue.prototype.$axios = axios
Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://39.100.241.104:8010/api'
// 允许cookie
Axios.defaults.withCredentials = true

Axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
