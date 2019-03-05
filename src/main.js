// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vuex from 'vuex'
import Axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const requestUrl = 'http://localhost:9011'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.use(Vuex)
Vue.use(iView)
Vue.use(mavonEditor)

const ADD_COUNT = 'ADD_COUNT' // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT'
//注册状态管理全局参数
var store = new Vuex.Store({
  state:{
    token:'',
    userID:'',
  },
  mutations: {
    //写法与getters相类似
    //组件想要对于vuex 中的数据进行的处理
    //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    //内部操作必须在此刻完成(同步)
    [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
      localStorage.setItem("token", token)
      state.token = token
    },
    [REMOVE_COUNT] (state) { // 退出登录 
      localStorage.removeItem("token") 
      state.token = token
    },
  }
})

router.beforeEach( (to, from, next) => {
  store.state.token = localStorage.getItem('token')
  // 如果跳转的路由必须要登录
  if(to.meta.checkAuth){
    if(store.state.token === '' || store.state.token === null){
      //  跳转到登录页面      
      next({
        path: '/login'
      })
    }else{      
      next()
    }
  }else{
    next()
  }
})

Axios.interceptors.request.use(
  config => {
    // localStorage.setItem("x-auth-token","fdsfdsgdfgsdfhdf")
    let token = localStorage.getItem("token")
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${token}`
    }
    if (config.url.indexOf(requestUrl) === -1) {
      config.url = requestUrl + config.url;/*拼接完整请求路径*/
    }
    return config;
  },
  err => {
    return Promise.reject(err)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
