<template>
  <div class="main_view">
    <!-- 全屏导航 -->
    <wii-full-nav v-show="isShow"></wii-full-nav>
    <!-- 头部 -->
    <wii-header></wii-header>
    <!-- 头部导航 -->
    <wii-main-nav></wii-main-nav>
    <div class="container">
      <!-- 子组件 -->
      <router-view ></router-view>
    </div>

  </div>
</template>

<script>
import wiiFullNav from "./wiiFullNav";
import wiiHeader from "./wiiHeader";
import wiiMainNav from "./wiiMainNav";
export default {
  name: "mainView",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      isShow: true
    };
  },
  mounted(){
     console.log('mainView组件挂载完成');
     if(this.$route.path != '/'){
       this.isShow = false;
     }else{
       this.isShow = true;
     }
  },
  updated(){
    console.log('mainView组件更新了');
     if(this.$route.path != '/'){
       this.isShow = false;
     }else{
       this.isShow = true;
     }
  },
  methods: {
   
  },
  components: {
    wiiFullNav,
    wiiHeader,
    wiiMainNav
  }
};
</script>

<style scoped>
@import url("../assets/css/mainView.css");
</style>
