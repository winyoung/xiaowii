<template>
  <div class="hot_selling_trend">
    <!-- 条件搜索 -->
    <div class="hot_selling_trend_search">
      <div class='hot_search '>
        <span>选择品类：</span>
        <input type="text" readonly :value="categoryInputVal" @click.prevent="toggleShow('category')">
        <i class="iconfont icon-jiantouxiangxia" @click.prevent="toggleShow('category')"></i>
        <ul class="hot_category" v-show="categoryShow">
          <li v-for="(item,index) in hotcategory" :key="index" @click.prevent="setInputVal('category',item)">
            {{item}}
          </li>
        </ul>
      </div>
      <div class='hot_search'>
        <span>选择时间：</span>
        <input type="text" readonly :value="timeInpurVal" @click.prevent="toggleShow('time')">
        <i class="iconfont icon-jiantouxiangxia" @click.prevent="toggleShow('time')"></i>
        <ul class="hot_time" v-show="timeShow">
          <li v-for="(item,index) in hottime" :key="index" @click.prevent="setInputVal('time',item)">
            {{item}}
          </li>
        </ul>
      </div>
      <div class='hot_search'>
        <span>选择渠道：</span>
        <input type="text" readonly :value="channelInputVal" @click.prevent="toggleShow('channel')">
        <i class="iconfont icon-jiantouxiangxia" @click.prevent="toggleShow('channel')"></i>
        <ul class="hot_channel" v-show="channelShow">
          <li v-for="(item,index) in hotsearch" :key="index" @click.prevent="setInputVal('channel',item)">
            {{item}}
          </li>
        </ul>
      </div>
      <input class="hot_setsearch" type="button" value="确定" @click.prevent="setSearch(categoryInputVal,timeInpurVal,channelInputVal)">
    </div>

    <!-- 图标展示 -->
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
    <div class="hot_selling_trend_detail">  
      
    </div>
  </div>
</template>
<style lang="less">
.hot_selling_trend {
  position: relative;
  top: 120px;
  .hot_selling_trend_search {
    z-index: 888;
    width: 100%;
    height: 50px;
    border: 1px solid #d2d3d8;
    background-color: #f2fafe;
    position: absolute;
    padding-left: 100px;
    .hot_search {
      width: 25%;
      // border: 1px solid red;
      position: absolute;
      top: 12px;
      &:nth-child(1) {
        left: 30px;
      }
      &:nth-child(2) {
        left: 280px;
      }
      &:nth-child(3) {
        left: 530px;
      }
      ul {
        width: 150px;
        position: absolute;
        left: 74px;
        box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0.5);
        background: linear-gradient(to bottom, #fff, #ddf1fc);

        li {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          &:hover {
            background: linear-gradient(to right, #fff, #ddf1fc);
            cursor: pointer;
          }
        }
      }
      input {
        border: 1px solid #d2d3d8;
        width: 150px;
        height: 25px;
        padding-left: 10px;
        cursor: pointer;
      }
      i {
        position: absolute;
        left: 203px;
        top: 3px;
      }
    }
    .hot_setsearch {
      position: absolute;
      right: 100px;
      top: 12px;
      width: 90px;
      height: 25px;
      background-color: #c3ddec;
    }
  }
  .hot_selling_trend_chart {
    position: absolute;
    top: 110px;
    width: 100%;
    height: 460px;
    border: 1px solid #d2d3d8;
  }
  .hot_selling_trend_proImg {
    position: absolute;
    width: 100%;
    height: 60px;
    top: 500px;
    ul {
      padding-left: 110px;
      li {
        width: 60px;
        height: 60px;
        float: left;
        margin-right: 20px;
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
  .hot_ranking_list {
    position: absolute;
    top: 84px;
    left: 500px;
    transform: translateX(-50%);
    font-size: 16px;
    font-weight: 600;
    span {
      padding: 5px;
      cursor: pointer;
      &:nth-child(1) {
        border: 1px solid #d2d3d8;
        border-bottom: 1px solid #fff;
      }
    }
  }
}
</style>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      categoryShow: false,
      timeShow: false,
      channelShow: false,
      hotcategory: [],
      hottime: [],
      hotsearch: [],
      categoryInputVal: "品类",
      timeInpurVal: "时间",
      channelInputVal: "渠道",
      hotTopImgs: [],
      chartsXdata: [],
      chartsYdata: [],
      chartsYname: "销量"
    };
  },
  methods: {
    toggleShow(val) {
      console.log(">>>>>>>>>>>>>下拉调用");
      var that = this;
      switch (val) {
        case "category":
          this.$axios
            .get("/static/json/selectJson.json")
            .then(res => {
              that.hotcategory = res.data.categoryData;
            })
            .catch(res => {
              console.log(error);
            });
          this.timeShow = false;
          this.channelShow = false;
          this.categoryShow = !this.categoryShow;
          break;
        case "time":
          var nowDate = new Date();
          this.hottime = [];
          for (var i = 0; i < 6; i++) {
            let nowYear = nowDate.getFullYear();
            let nowMonth =
              nowDate.getMonth() + 1 - i > 0
                ? nowDate.getMonth() + 1 - i
                : nowDate.getMonth() + 1 - i + 12;
            this.hottime.push(nowYear + "年" + nowMonth + "月");
          }
          this.categoryShow = false;
          this.channelShow = false;
          this.timeShow = !this.timeShow;
          break;
        case "channel":
          this.$axios
            .get("/static/json/selectJson.json")
            .then(res => {
              that.hotsearch = res.data.channelData;
            })
            .catch(res => {
              console.log(error);
            });
          this.categoryShow = false;
          this.timeShow = false;
          this.channelShow = !this.channelShow;
          break;
      }
    },
    setInputVal(val, inputVal) {
      switch (val) {
        case "category":
          this.categoryInputVal = inputVal;
          this.categoryShow = !this.categoryShow;
          break;
        case "time":
          this.timeInpurVal = inputVal;
          this.timeShow = !this.timeShow;
          break;
        case "channel":
          this.channelInputVal = inputVal;
          this.channelShow = !this.channelShow;
          break;
      }
    },
    //条件搜索
    setSearch(cate, time, channel) {
      this.$axios
        .post(
          "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/search",
          {
            cate: cate,
            time: time,
            channel: channel
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
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
      myChart.on("click", function(param) {
        var name = param.name;
        xdata.forEach((v, i) => {
          if (name == v) {
            // console.log(v,name,'>>>>>>>>>>>>>>>>>>>')
          }
        });
      });
    },
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
            that.chartsXdata = res.data.data.chartsXdata;
            that.chartsYdata = res.data.data.chartsYdata;
            that.setEcharts(that, that.chartsXdata, that.chartsYdata, name);
        } else if (name == "涨幅") {
          that.chartsXdata = res.data.rankingData.chartsXdata;
          that.chartsYdata = res.data.rankingData.chartsYdata;
          that.setEcharts(that, that.chartsXdata, that.chartsYdata, name);
        }
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
        that.chartsXdata = res.data.data.chartsXdata;
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
  }
};
</script>

