<template>
  <div class="main_view">
    <wii-full-nav></wii-full-nav>
    <!-- 头部 -->
    <wii-header></wii-header>
    <wii-main-nav></wii-main-nav>
  </div>
</template>

<script>
import wiiFullNav from './wiiFullNav'
import wiiHeader from './wiiHeader'
import wiiMainNav from './wiiMainNav'
export default {
  name: 'mainView',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    wiiFullNav,
    wiiHeader,
    wiiMainNav
  }
}
</script>

<style scoped>
@import url('../assets/css/mainView.css');
</style>
