<template>
<div>
  <div class="chengkai"></div>
  <div class="title"><span style="font-size:20px;color:#8f8f8f;margin-left:20px">热卖趋势</span></div>
  <div class="hot_selling_trend">
    <!-- 条件搜索 -->
    <condition-search>
      <span slot="title1">选择品类：</span>
      <span slot="title2">选择时间：</span>
      <span slot="title3">选择渠道：</span>
    </condition-search>

    <!-- 图形展示 -->
    <div class="hot_selling_trend_chart">
    </div>

    <!-- 热销榜 飙升榜 -->
    <div class="hot_ranking_list">
      <span class="hot_ranking_greatsale" @click="toggleRanking('销量',$event)">热销榜</span>
      <span class="hot_ranking_greatup" @click="toggleRanking('涨幅', $event)">飙升榜</span>
    </div>

    <!-- 图片遮罩层 -->
    <div class="hot_selling_trend_proImg">
      <ul class="clearfix">
        <li v-for="(item, index) in hotTopImgs" :key="index">
          <img :src="item" alt="">
        </li>
      </ul>
    </div>

    <!-- 弹出框 商品详情，客户评论等 -->
    <router-view :proid="proId" :isShow="showProDeatilData" @deletebox="deleteBox"></router-view>
  </div>
</div>
  
</template>
<style>
@import url("../../assets/css/proDev/hotSellingTrend.css");
</style>
<script>
// import axios from "axios";
import showProDetail from "../reusableCom/showProDetail";
import conditionSearch from "../reusableCom/conditionSearch"
export default {
  data() {
    return {
      hotTopImgs: [], //前十图片
      chartsXdata: [], //图形x轴数据
      chartsYdata: [], //图形y轴数据
      chartsYname: "销量",
      proId:'',//当前点击的柱形图id
      showProDeatilData: "",//子组件的弹窗的是否显示
    };
  },
  methods: {
    //设置图表
    setEcharts(that, xdata, ydata, name) {
      var myChart = that.$echarts.init(
        document.querySelector(".hot_selling_trend_chart")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "热卖趋势"
        },
        tooltip: {},
        xAxis: {
          data: xdata
        },
        yAxis: {},
        grid: {
          bottom: "16%"
          // containLabel: true
        },
        series: [
          {
            name: name,
            type: "bar",
            data: ydata
          }
        ]
      });
      myChart.off("click");
      myChart.on("click", function(param) {
        var name = param.name;
        //xdata传入时可以放当前点击的柱状图的id；
        that.$router.push('hotSellingTrend/showProDetail');
        xdata.forEach((v, i) => {
          if (name == v) {
            // console.log(v,name,'>>>>>>>>>>>>>>>>>>>')
            // that.proDetailShow(v);
            that.proId = v;
            that.showProDeatilData = true;
          }
        });
      });
    },
    //切换排行榜
    toggleRanking(name, event) {
      event.target.parentNode.children[0].style.border = "none";
      event.target.parentNode.children[1].style.border = "none";
      event.target.style.border = "1px solid #d2d3d8";
      event.target.style.borderBottom = "1px solid #fff";
      //根据不同排行类型获取数据并重新渲染图形
      var that = this;
      new Promise((resolve, reject) => {
        that.$axios
          .get(
            "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/chartsData"
          )
          .then(res => {
            resolve(res);
          });
      }).then(res => {
        // console.log(res, "````````````````````");
        if (name == "销量") {
          that.chartsXdata = res.data.data.id;
          that.chartsYdata = res.data.data.chartsYdata;
          that.setEcharts(that, that.chartsXdata, that.chartsYdata, name);
        } else if (name == "涨幅") {
          that.chartsXdata = res.data.rankingData.id;
          that.chartsYdata = res.data.rankingData.chartsYdata;
          that.setEcharts(that, that.chartsXdata, that.chartsYdata, name);
        }
      });
    },
    //传入子组件的弹窗触发
    deleteBox() {
      this.showProDeatilData = false;
       
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
        that.chartsXdata = res.data.data.id;//这里最好读取id放入x轴
        that.chartsYdata = res.data.data.chartsYdata;
        // console.log( that.chartsXdata , that.chartsYdata)
        that.setEcharts(that, that.chartsXdata, that.chartsYdata, "销量");
      });
    })(that);

    //前十十张商品图
    (function(that) {
      that.$axios
        .get(
          "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/imgs"
        )
        .then(res => {
          that.hotTopImgs = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    })(that);
  },
  components: {
    showProDetail,
    conditionSearch
  },
  // watch: {
  //   $route(nV, oV) {
  //     console.log(nV, oV);
  //   }
  // }
};
</script>

