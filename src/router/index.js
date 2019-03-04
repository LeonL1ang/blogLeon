import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/index'
import Login from '@/view/login/index'
import Register from '@/view/register/index'
import P404 from '@/view/p404/index'
import ArticleEdit from '@/view/article/edit/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user',
      name: 'user',
      meta: {        
        checkAuth: true
      }
    },
    {
      path: '/article/edit',
      name: 'articleEdit',
      component: ArticleEdit
    },
    { path: '*', component: P404 }  //这里是保证错误地址会跳转到404界面进行提示
  ]
})
