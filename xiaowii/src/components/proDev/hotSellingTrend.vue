<template>
    <div class="hot_selling_trend clearfix">
        <!-- <select>
                <option value="recliner">RECLINER</option>
                <option value="office chair">OFFICE CHAIR</option> -->
        <!-- <option disabled="disabled" value="value1">GAMING CHAIR</option>
                <option disabled="disabled" value="value1">MATTRESSES</option>
                <option disabled="disabled" value="value1">BAR STOOLS</option>
                <option disabled="disabled" value="value1">PATIO UMBRELLA</option>
                <option disabled="disabled" value="value1">COAT RACK</option> -->
        <!-- </select> -->
        <div class='hot_search '>
            <span>品类：</span>
            <input type="text" readonly value="RECLINER" @click="toggleShow('category')">
            <ul class="hot_category" v-show="categoryShow">
                <li>RECLINER</li>
                <li>OFFICE CHAIR</li>
            </ul>
        </div>
        <div class='hot_search'>
            <span>时间：</span>
            <input type="text" readonly value="xx年xx月xx日" @click="toggleShow('time')">
            <ul class="hot_time" v-show="timeShow">
                <li>xx年xx月xx日</li>
                <li>xx年xx月xx日 </li>
            </ul>
        </div>
        <div class='hot_search'>
            <span>渠道：</span>
            <input type="text" readonly value="Amazon"  @click="toggleShow('channel')">
            <ul class="hot_channel" v-show="channelShow">
                <li>Amazon</li>
                <li>Amazon CHAIR</li>
            </ul>
        </div>
        <input type="button" value="确定">
        
    </div>
</template>
<style lang="less">
.hot_selling_trend {
  width: 1000px;
  height: 50px;
  border: 1px solid pink;
  position: absolute;
  top: 120px;
 
  .hot_search {
    width: 25%;
    border: 1px solid red;
    float: left;
    ul {
      width: 250px;
      margin-left: 47px;
    }
    input {
      border: 1px solid green;
      height: 30px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
        categoryShow: false,
        timeShow:false,
        channelShow:false
    }
  },
  methods:{
      toggleShow(val){
          console.log('>>>>>>>>>>>>>下拉调用')
          switch(val){
              case 'category': this.categoryShow = !this.categoryShow
              break;
              case 'time': this.timeShow = !this.timeShow
              break;
              case 'channel': this.channelShow = !this.channelShow
              break;
          }
      }
  },
  mounted() {
    // this.$store.commit('toggleShow', {isShow: false});
    // console.log(this.$store.state.isShow, 'hotsell');
  }
};
</script>

