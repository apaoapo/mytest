import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'


Vue.use(ElementUI)

import "./assets/css/global.css"
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
