<template>
    <transition>
        <div v-show="isShow" class="box">
            <div class="hot_selling_trend_detail">
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
        </div>

    </transition>
</template>
<style lang="less">
@import url("../../assets/css/reusableCom/showProDetail.css");
</style>
<script>
export default {
  data() {
    return {
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
    //删除弹出框
    deleteBox() {
      this.$emit("deletebox");
       setTimeout(() => {
        this.$router.go(-1);
      }, 300);
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
  props: ["isShow", "proid"],
  mounted() {
    console.log("弹窗挂在完毕", this.proid);
    //请求商品详情数据并渲染
  }
};
</script>

