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
          <li v-for="(item,index) in hotchannel" :key="index" @click.prevent="setInputVal('channel',item)">
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
    <transition>
      <div class="hot_selling_trend_detail" v-show="showBox">
        <div class="deleteBox" @click="deleteBox()"></div>
        <div class='detail_category'>
          <span class="detail_active" @click="toggleDetail('proDetail', $event)">商品详情</span>|
          <span @click="toggleDetail('comments', $event)">客户评价</span>|
          <span @click="toggleDetail('questions', $event)">客户问题</span>|
          <span @click="toggleDetail('estimate', $event)">成本预估</span>
        </div>
        <!-- 商品详情 -->
        <div class="detail_pro" v-show="detailShow">
          <div class="detail_pro_imgs">
            <img src="../../assets/test.jpg" alt="">
          </div>
          <div class="detail_pro_info">
            <table>
              <tbody>
                <tr>
                  <td colspan="2" class="info">Brand</td>
                  <td>Larnn</td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Color</td>
                  <td>Gray</td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Customer Reviews</td>
                  <td>
                    4.9
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Item model number</td>
                  <td>
                    MCS-LSCG
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Manufacturer</td>
                  <td>
                    Larnn
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Shipping Weight</td>
                  <td>
                    2 pounds
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Item Weight</td>
                  <td>
                    1.1 pounds
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Product Dimensions</td>
                  <td>
                    17.8 x 13.9 x 3.2 inches
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Product Dimensions</td>
                  <td>
                    17.8 x 13.9 x 3.2 inches
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Product Dimensions</td>
                  <td>
                    17.8 x 13.9 x 3.2 inches
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Product Dimensions</td>
                  <td>
                    17.8 x 13.9 x 3.2 inches
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Product Dimensions</td>
                  <td>
                    17.8 x 13.9 x 3.2 inches
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="info">Product Dimensions</td>
                  <td>
                    17.8 x 13.9 x 3.2 inches
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 客户评价 -->
        <div class="user_comments" v-show="commentsShow">
          <ul>
            <li v-for="(item,index) in userCommentsData" :key="index">
              <div class="username" style="margin-bottom:5px">
                <i class="iconfont icon-yonghu1"></i>
                <span>{{item.username}}</span>
              </div>
              <div class="stars" style="margin-bottom:5px">
                <div class="block">
                  <el-rate v-model="starValue[index]" disabled></el-rate>
                </div>
              </div>
              <div class="contents" style="margin-bottom:5px">
                <p style="font-weight:600;margin-bottom:10px">{{item.firstCom}}</p>
                <p>{{item.secondCom}}</p>
              </div>
              <div class="commentsTime">
                <p>{{item.comTime}}</p>
              </div>
            </li>
          </ul>

        </div>
        <!-- 客户问题 -->
        <div class="user_questions" v-show="questionsShow">
          <ul>
            <li>
              <div>
                <span>问题：</span>
                <p>也许期待的不过是与世间为敌也许期待的不过是与世间为敌</p>
              </div>
              <div>
                <span>回答：</span>
                <p>也许期待的不过是与世间为敌</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 成本预估 -->
        <div class="cost_estimate" v-show="estimateShow">
          <form>
            <div>
              <label>请输入FOB(单位：USD$)</label>
              <input type="number" v-model="costEstimateData.fob">
            </div>
            <div>
              <label>请输入包装长(单位：inches)</label>
              <input type="number" v-model="costEstimateData.proLength">
            </div>
            <div>
              <label>请输入包装宽(单位：inches)</label>
              <input type="number" v-model="costEstimateData.proWidth">
            </div>
            <div>
              <label>请输入包装高(单位：inches)</label>
              <input type="number" v-model="costEstimateData.proHeight">
            </div>
            <div>
              <label>请输入产品毛重（单位：pounds)</label>
              <input type="number" v-model="costEstimateData.proWeight">
            </div>
          </form>
          <div class="cost_estimate_submit" @click="estimateSubmit()">
            <button>提 交</button>
          </div>
          <div class="cost_estimate_result">
            <input type="text" readonly :value="costEstimateData.result">
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<style>
@import url("../../assets/css/proDev/hotSellingTrend.css");
</style>
<script>
// import axios from "axios";
export default {
  data() {
    return {
      categoryShow: false,
      timeShow: false,
      channelShow: false,
      hotcategory: [], //条件搜索分类下拉数据
      hottime: [], //条件搜索时间下拉数据
      hotchannel: [], //条件搜索渠道下拉数据
      categoryInputVal: "品类",
      timeInpurVal: "时间",
      channelInputVal: "渠道",
      hotTopImgs: [], //前十图片
      chartsXdata: [], //图形x轴数据
      chartsYdata: [], //图形y轴数据
      chartsYname: "销量",
      showBox: false, //弹出框
      detailShow: true, //商品详情
      commentsShow: false, //客户评价
      questionsShow: false, //客户问题
      estimateShow: false, //成本预估
      starValue: [], //客户评价星星等级
      userCommentsData: [], //客户评价数据
      costEstimateData: {
        fob: null,
        proLength: null,
        proWidth: null,
        proHeight: null,
        proWeight: null,
        result: null
      } //成本预估数据
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
              that.hotchannel = res.data.channelData;
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
            that.proDetailShow(v);
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
          that.chartsXdata = res.data.data.chartsXdata;
          that.chartsYdata = res.data.data.chartsYdata;
          that.setEcharts(that, that.chartsXdata, that.chartsYdata, name);
        } else if (name == "涨幅") {
          that.chartsXdata = res.data.rankingData.chartsXdata;
          that.chartsYdata = res.data.rankingData.chartsYdata;
          that.setEcharts(that, that.chartsXdata, that.chartsYdata, name);
        }
      });
    },
    //弹出框显示
    proDetailShow(name) {
      //获取当前点击的商品数据

      //添加弹出框遮罩层
      this.showBox = true;
    },
    //删除弹出框
    deleteBox() {
      this.showBox = false;
    },
    //切换商品详情，客户评论等
    toggleDetail(val, event) {
      //被点击的显示颜色，其他的不显示
      var childrenspan = event.target.parentNode.children;
      for (let i = 0; i < childrenspan.length; i++) {
        childrenspan[i].classList.remove("detail_active");
      }
      event.target.classList.add("detail_active");
      //显示对应部分，其他隐藏
      switch (val) {
        case "proDetail":
          this.detailShow = true;
          this.commentsShow = false;
          this.questionsShow = false;
          this.estimateShow = false;
          break;
        case "comments":
          this.detailShow = false;
          this.commentsShow = true;
          this.questionsShow = false;
          this.estimateShow = false;
          this.getUserComments();
          break;
        case "questions":
          this.detailShow = false;
          this.commentsShow = false;
          this.questionsShow = true;
          this.estimateShow = false;
          break;
        case "estimate":
          this.detailShow = false;
          this.commentsShow = false;
          this.questionsShow = false;
          this.estimateShow = true;
          break;
      }
    },
    //获取客户评论数据
    getUserComments() {
      this.$axios
        .get(
          "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/userComments"
        )
        .then(res => {
          // console.log(res);
          this.userCommentsData = res.data.data;
          //将数据里的星星评级数据放入starValue
          this.starValue = [];
          for (var i = 0; i < res.data.data.length; i++) {
            var starVal = res.data.data[i].starVal;
            if (starVal > Math.floor(starVal)) {
              starVal = Math.floor(starVal) + 0.5;
            }
            this.starValue.push(starVal);
          }
        });
    },
    //成本预估数据提交
    estimateSubmit() {
      this.costEstimateData.result =
        this.costEstimateData.fob -
        0 +
        (this.costEstimateData.proWidth - 0) +
        (this.costEstimateData.proHeight - 0) +
        (this.costEstimateData.proWeight - 0);
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

