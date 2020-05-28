import Vue from 'vue'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://39.100.241.104:8010/api'
// 配置POST请求
Axios.defaults.headers.post["Content-Type"] = "multipart/form-data; charset=UTF-8";

// 配置PUT请求
Axios.defaults.headers.put["Content-Type"] = "application/json;charset=UTF-8";

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
