import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLocalStorage from 'vue-localstorage'

import Qs from 'qs'

Vue.use(VueLocalStorage)
// axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.baseURL = '/api'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Vue.use(VueAxios, axios)
// Vue.prototype.axios = axios;

// 配置请求和响应的拦截器
// 拦截器配置，  这是请求拦截器，所有请求发送出去之前都要走这里
axios.interceptors.request.use(function (config) {
  // 大多数的web服务器只能识别form的post的请求，即请求头Content-Type为'application/x-www-form-urlencoded'
  // 'application/x-www-form-urlencoded'
  // 'application/json'
  // 'multipart/form-data'
  config.headers['Content-Type']= 'application/x-www-form-urlencoded;charset=utf-8';
  // var myToken = Vue.localStorage.get('token');
  console.log('所有请求发出成功之前--1：', config)
  if(config.url != '/api/login'){
    var myToken = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${myToken}`;
    if(myToken){
      config.data = config.data?config.data:{};
      config.data.token = myToken;
      config.data = Qs.stringify(config.data)
      // Object.assign(config.data, {'token': myToken})
    }
  }
  return config;
}, function (error) {
  console.log('所有请求发出 失败 之前--1：', error)
  return Promise.reject(error);
});

// 服务器响应拦截器，所有的数据返回之前 都要走这里
axios.interceptors.response.use(function (response) {
  console.log('所有成功响应 先走拦截器里--2：', response)
  return response.data;
  // return response;
}, function (error) {
  console.log('所有失败响应 先走拦截器里--2：', error)
  return Promise.reject(error);
});

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
