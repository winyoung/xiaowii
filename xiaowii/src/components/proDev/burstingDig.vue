<template>
    <div class="hot_sale">
        <!-- 条件搜索 -->
        <div class="search clearfix">
            <div class="search_input" @click="searchInput($event)">
                <input type="text" readonly placeholder="按渠道">
                <ul >
                    <li v-for="(item, index) in ulForSelectData.channel" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="search_input" @click="searchInput($event)">
                <input type="text" readonly placeholder="按材质">
                <ul>
                    <li v-for="(item, index) in ulForSelectData.texture" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="search_input" @click="searchInput($event)">
                <input type="text" readonly placeholder="按颜色">
                <ul >
                    <li v-for="(item, index) in ulForSelectData.color" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="search_input" @click="searchInput($event)">
                <input type="text" readonly placeholder="按功能">
                <ul >
                    <li v-for="(item, index) in ulForSelectData.function" :key="index">{{item}}</li>
                </ul>
            </div>
            <div class="search_input">
                <input type="text" placeholder="请输入关键词">
            </div>
            <div class="search_input">
                <button>确定</button>
            </div>
        </div>
    </div>
</template>
<style>
@import url("../../assets/css/proDev/burstingDig.css");
</style>
<script>
export default {
  data() {
    return {
      searchUlShow: false, //ul是否显示
      ulForSelectData: {
        channel: [],
        texture: [],
        color: [],
        function: []
      } //各个下拉框数据
    };
  },
  methods: {
    //条件搜索下拉框的显示隐藏
    searchInput(event) {
      var uls = document.querySelectorAll('.search_input ul');
      console.log(uls)
      for(var i=0; i<uls.length; i++){
          uls[i].classList.remove('ulShow');
      }
      if (event.target.tagName == "INPUT") {
        let ulVal = event.target.parentNode.children[1];
        // if (ulVal.classList.contains("ulShow")) {
        //   ulVal.classList.remove("ulShow");
        //   ulVal.classList.add("ulHide");
        // } else {
        //   ulVal.classList.remove("ulHide");
        //   ulVal.classList.add("ulShow");
        // }
        ulVal.classList.toggle('ulShow');
      } else if (event.target.tagName == "DIV") {
        let ulVal = event.target.children[1];
        if (ulVal.classList.contains("ulShow")) {
          ulVal.classList.remove("ulShow");
          ulVal.classList.add("ulHide");
        } else {
          ulVal.classList.remove("ulHide");
          ulVal.classList.add("ulShow");
        }
      }
    }
  },
  mounted() {
    //获取条件搜索框的所有下拉数据
    this.$axios
      .get(
        "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/burstingInputVal"
      )
      .then(res => {
        console.log(res.data);
        this.ulForSelectData.channel = res.data.anqudao;
        this.ulForSelectData.texture = res.data.ancaizhi;
        this.ulForSelectData.color = res.data.anyanse;
        this.ulForSelectData.function = res.data.angongneng;
      });
  },
  components: {}
};
</script>