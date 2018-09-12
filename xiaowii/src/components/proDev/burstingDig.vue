<template>
    <div>
        <div class="chengkai"></div>
        <div class="hot_sale">
            <!-- 条件搜索 -->
            <div class="search">
                <el-select clearable v-model='selectVal.channelvalue' placeholder="渠道">
                    <el-option v-for="(item,index) in ulForSelectData.channel" :key="index" :value="item">
                    </el-option>
                </el-select>
                <el-select clearable v-model='selectVal.texturevalue' placeholder="材质">
                    <el-option v-for="(item,index) in ulForSelectData.texture" :key="index" :value="item">
                    </el-option>
                </el-select>
                <el-select clearable v-model='selectVal.colorvalue' placeholder="颜色">
                    <el-option v-for="(item,index) in ulForSelectData.color" :key="index" :value="item">
                    </el-option>
                </el-select>
                <el-select clearable v-model='selectVal.functionvalue' placeholder="功能">
                    <el-option v-for="(item,index) in ulForSelectData.function" :key="index" :value="item">
                    </el-option>
                </el-select>
                <div class="search_input">
                    <input type="text" placeholder="请输入关键词" v-model='selectVal.keywords'>
                </div>
                <div class="submitBtn">
                    <button @click='submitSearch()'>确定</button>
                </div>
            </div>
            <!-- 产品列表 -->
            <div class="proList">
                <el-table :data="tableData" style="width: 100%" >
                    <el-table-column align='center' width='40' label="序号" prop="id">
                    </el-table-column>
                    <el-table-column align='center' width="65" label="图片">
                        <template slot-scope="props">
                            <img style="width:50px" :src="props.row.img" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column align='center' width="280" label="描述" prop="desc">
                    </el-table-column>
                    <el-table-column align='center' label="月销量" prop="monthSales">
                    </el-table-column>
                    <el-table-column align='center' label="总销量" prop="totalSales">
                    </el-table-column>
                    <el-table-column align='center' label="售价" prop="price">
                    </el-table-column>
                    <el-table-column align='center' width='120' label="月销售额" prop="totalPrice">
                    </el-table-column>
                    <el-table-column align='center' width='99' label="评分">
                        <template slot-scope="props">
                            <div class="block">
                                <el-rate v-model="props.row.star" disabled></el-rate>
                            </div>
                            <span style='font-size:14px;color:rgb(247, 186, 42);margin-left:5px;'>{{props.row.star}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align='center' width="95" label="起售时间" prop="saleTime">
                    </el-table-column>
                    <el-table-column align='center' width='50' label="更多">
                        <template slot-scope="props">
                            <i class="iconfont icon-iconfontgengduo" :data-proid="props.row.id" @click="showDetailBox($event)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="paginations">
                <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="paginations.total">
                </el-pagination>
            </div>
            <!-- 弹窗 -->
            <router-view :isShow="isDetailBoxShow" :proid="proId" @deletebox="deleteBox"></router-view>
        </div>

    </div>

</template>
<style>
@import url("../../assets/css/proDev/burstingDig.css");
</style>
<script>
import showProDetail from "../reusableCom/showProDetail";
export default {
  data() {
    return {
      isDetailBoxShow: false, //弹窗是否显示
      proId: "", //当前产品id
      ulForSelectData: {
        channel: [],
        texture: [],
        color: [],
        function: []
      }, //各个下拉框数据
      selectVal: {
        channelvalue: "",
        texturevalue: "",
        colorvalue: "",
        functionvalue: "",
        keywords: ""
      }, //input框选定数据
      tableData: [], //产品列表数据
      paginations: {
        total: 500
      }
    };
  },
  methods: {
    //条件搜素提交按钮点击
    submitSearch() {
      var data = this.selectVal;
      console.log(data);
      //此处提交数据
      // this.$axios.get....
    },

    //分页部分
    changePage(val) {
      console.log("被点击的页码", val);
      //发送当前页码，获取当前页数据
      //this.$axios.get().then(res=>{console.log(res)})....
    },

    //显示商品详情弹窗
    showDetailBox(event) {
      this.$router.push("burstingDig/showProDetail");
      this.isDetailBoxShow = true;
      this.proId = event.target.dataset.proid;
    },
    //删除弹窗
    deleteBox() {
      this.isDetailBoxShow = false;
    }
  },
  mounted() {
    //获取条件搜索框的所有下拉数据
    this.$axios
      .get(
        "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/burstingInputVal"
      )
      .then(res => {
        this.ulForSelectData.channel = res.data.anqudao;
        this.ulForSelectData.texture = res.data.ancaizhi;
        this.ulForSelectData.color = res.data.anyanse;
        this.ulForSelectData.function = res.data.angongneng;
      });

    //获取第一页产品列表
    this.$axios
      .get(
        "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/proList"
      )
      .then(res => {
        console.log(res.data);
        this.tableData = res.data.data;
      });
  },
  components: {
    showProDetail
  }
};
</script>