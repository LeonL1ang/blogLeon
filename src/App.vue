<template>
  <div id="app">
    <header-view @eventMenuChange="menuChange" v-if="isShowHeader"/>
    <router-view/>
  </div>
</template>

<script>

import headerView from './components/header.vue'

export default {
  name: 'App',
  provide () {
      return {
          reloadHeaderLogin: this.reloadHeaderLogin
      }
  },
  data () {
    return {      
      isShowHeader: true
    }
  },
  components: {
    headerView
  },
  created() {

  },
  methods: {
    menuChange(pathName){
      // if(pathName === '/login' || pathName === '/register'){
      //   this.isShowHeader = false
      // }else{
      //   this.isShowHeader = true
      // }
    },
    reloadHeaderLogin(){
      this.isShowHeader = false
      this.$nextTick( () => {        
        this.isShowHeader = true
      })
    }
  }
}
</script>

<style>
</style>
