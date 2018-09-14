<template>
  <div>
    <!-- 图形展示卡片展示 -->
    <div class="chart_box">
      <!-- 层次导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotSellingTrend' }">热卖趋势</el-breadcrumb-item>
        <el-breadcrumb-item>飙升榜</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="hot_selling_trend_chart">
      </div>
      <!-- 图片遮罩层 -->
      <div class="hot_selling_trend_proImg">
        <ul class="clearfix">
          <li v-for="(item, index) in hotTopImgs" :key="index">
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
    </div>
    <!-- 弹出框 商品详情，客户评论等 -->
    <router-view :proid="proId" :isShow="showProDeatilData" @deletebox="deleteBox"></router-view>
  </div>
</template>
<script>
import showProDetail from "../reusableCom/showProDetail";
export default {
  data() {
    return {
      hotTopImgs: [], //前十图片
      chartsXdata: [], //图形x轴数据
      chartsYdata: [], //图形y轴数据
      chartsYname: "销量",
      proId: "", //当前点击的柱形图id
      showProDeatilData: "" //弹窗子组件的是否显示
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
          text: "热销榜"
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
      myChart.on("click", function(param) {
        var name = param.name;
        //xdata传入时可以放当前点击的柱状图的id；
        that.$router.push("echartsBox/showProDetail");
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
        that.chartsXdata = res.data.data.id; //这里最好读取id放入x轴
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
    showProDetail
  },
  destroyed(){
    
    this.$emit('togglecardboxshow');
  }
};
</script>

