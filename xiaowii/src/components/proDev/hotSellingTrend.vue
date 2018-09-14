<template>
  <div>
    <div class="chengkai not-print"></div>
    <div class="title not-print">
      <span style="font-size:20px;color:#8f8f8f;margin-left:20px">热卖趋势</span>
    </div>
    <div class="hot_selling_trend ">
      <!-- 条件搜索 -->
      <condition-search>
        <span slot="title1">选择品类：</span>
        <span slot="title2">选择时间：</span>
        <span slot="title3">选择渠道：</span>
      </condition-search>

      <!-- 卡片式热销榜，飙升榜 -->
      <div class="cardBox" v-show="cardBoxShow" @click="toggleCardBoxShow()">
        <div class="cardBox1">
          <div class="title">
            <h2>热销榜</h2>
          </div>
          <div class="chart_box"></div>
          <div class="info">
            <span>
              <i>👀</i>
            </span>
            <span>评论数</span>
          </div>
        </div>
      </div>

      <router-view @togglecardboxshow="showCardBox"></router-view>

      <button @click="printUi()">打印</button>
    </div>
  </div>

</template>
<style>
@import url("../../assets/css/proDev/hotSellingTrend.css");
</style>
<script>
// import axios from "axios";
import conditionSearch from "../reusableCom/conditionSearch";
import echartsBox from "../reusableCom/echartsBox";
export default {
  data() {
    return {
      cardBoxShow: true, //卡片显示
      chartsXdata: [],
      chartsYdata: []
    };
  },
  methods: {
    //打印功能
    printUi() {
      console.log("打印执行");

      // let subOutputRankPrint = document.querySelector(".hot_selling_trend_chart");
      // console.log(subOutputRankPrint.innerHTML);
      // let newContent = subOutputRankPrint.innerHTML;
      // let oldContent = document.body.innerHTML;
      // document.body.innerHTML = newContent;
      // window.print();
      // window.location.reload();
      // document.body.innerHTML = oldContent;
      // return false;
      window.print();
    },
    //切换卡片显示
    toggleCardBoxShow() {
      this.cardBoxShow = false;
      this.$router.push("hotSellingTrend/echartsBox");
    },
    //由子路由销毁时触发，显示当先卡片div
    showCardBox() {
      this.cardBoxShow = true;
    },
    //设置图表
    setEcharts(that, xdata, ydata, name) {
      var myChart = that.$echarts.init(document.querySelector(".chart_box"));
      // 绘制图表
      myChart.setOption({
        // title: {
        //   text: "热销榜"
        // },
        tooltip: {},
        xAxis: {
          data: xdata
        },
        yAxis: {},
        grid: {
          left: "15%", //距离左边的距离
          right: "6%", //距离右边的距离
          bottom: "8%", //距离下边的距离
          top: "12%" //距离上边的距离
        },
        series: [
          {
            name: name,
            type: "bar",
            data: ydata
          }
        ]
      });
    }
  },
  mounted() {
    //图形数据与显示
    var that = this;
    (function(that) {
      new Promise((resovle, reject) => {
        //获取图形所需数据
        that.$axios
          .get(
            "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/chartsData"
          )
          .then(res => {
            resovle(res);
          });
      }).then(res => {
        that.chartsXdata = res.data.data.id; //这里最好读取id放入x轴
        that.chartsYdata = res.data.data.chartsYdata;
        // console.log( that.chartsXdata , that.chartsYdata)
        that.setEcharts(that, that.chartsXdata, that.chartsYdata, "销量");
      });
    })(that);
  },
  components: {
    echartsBox,
    conditionSearch
  }
};
</script>

