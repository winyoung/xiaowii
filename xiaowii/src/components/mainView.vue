<template>
  <div>
    <div class="main_view">
      <!-- 全屏导航 -->
      <wii-full-nav v-show="isShow"></wii-full-nav>
      <!-- 头部 -->
      <wii-header></wii-header>
      <!-- 头部导航 -->
      <wii-main-nav></wii-main-nav>
      <div class="container">
        <!-- 子组件 -->
        <router-view></router-view>
      </div>
    </div>
    <div class="transitionBgbox"><img src="../assets/5-121204193R0-50.gif" alt=""></div>
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
  mounted() {
    // var bgBox = document.createElement("div");
    // bgBox.style.position = "fixed";
    // bgBox.style.height = "100%";
    // bgBox.style.width = "100%";
    // bgBox.style.backgroundColor = "rgba(0, 0, 0 ,.5)";
    // bgBox.style.zIndex = "9999";
    // console.log(bgBox);
    // var bodyBox = document.querySelector("body");
    // 添加请求拦截器
    var bgBox = document.querySelector('.transitionBgbox');
    this.$axios.interceptors.request.use(function(config) {
      // 在发送请求之前做些什么
      console.log("正在请求数据");
      bgBox.style.display = 'block';
      return config;
    });

    // 添加响应拦截器
    this.$axios.interceptors.response.use(function(response) {
      // 对响应数据做点什么
      console.log("数据请求完成");
      bgBox.style.display = 'none';
      return response;
    });

    // console.log("mainView组件挂载完成");
    if (this.$route.path != "/") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  updated() {
    // console.log("mainView组件更新了");
    if (this.$route.path != "/") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  },
  methods: {},
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
