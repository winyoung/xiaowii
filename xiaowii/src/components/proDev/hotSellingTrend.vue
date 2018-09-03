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
    top: 100px;
    width: 100%;
    height: 400px;
    border: 1px solid red;
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
      channelInputVal: "渠道"
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
    }
    // hideSelect(val) {
    //   switch(val){
    //     case 'category':
    //     this.categoryShow = !this.categoryShow;
    //     break;
    //     case 'time':
    //     this.timeShow = !this.timeShow;
    //     break;
    //     case 'channel':
    //     this.channelShow = !this.channelShow;
    //     break;
    //   }
    // }
  },
  mounted() {
    var myChart = this.$echarts.init(
      document.querySelector(".hot_selling_trend_chart")
    );
    // 绘制图表
    myChart.setOption({
      title: {
        text: "热卖趋势"
      },
      // tooltip: {},
      // xAxis: {
      //   data: ["办公椅", "电竞椅", "躺椅", "桌子", "沙发", "板凳"]
      // },
      // yAxis: {},
      // series: [
      //   {
      //     name: "销量",
      //     type: "bar",
      //     data: [5, 20, 36, 10, 10, 20]
      //   }
      // ]
       tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['开审', '邮件营销','联盟广告','视频广告','搜索引擎']
    },
    grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['办公椅','电竞椅','躺椅','桌子','沙发','板凳','软椅']
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
    });
    myChart.on("click", function(param) {
      var name = param.name;
      if (name == "办公椅") {
        console.log('>>>>>>>>>>>>>>办公椅')
      } else if (name == "电竞椅") {
        console.log('>>>>>>>>>>>>>>电竞椅')
      } 
    });
  }
};
</script>

