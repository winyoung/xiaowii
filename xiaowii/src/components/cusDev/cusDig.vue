<template>
  <div>
    <div class="chengkai"></div>
    <div class="title">
      <span style="font-size:20px;color:#8f8f8f;margin-left:20px">客户挖掘</span>
    </div>
    <div class="cus_dig">
      <!-- 条件搜索 -->
      <div class="search">
        <div class="search_list">
          <h3 style="color:#999;margin-bottom:5px">品类：</h3>
          <el-checkbox-group v-model="checkedList.category">
            <el-checkbox v-for="item in allList.category" :label="item" :key="item" :disabled="item==='BAR STOOL'||item==='DINING CHAIR'">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="search_list">
          <h3 style="color:#999;margin-bottom:5px">区域：</h3>
          <el-checkbox-group v-model="checkedList.area">
            <el-checkbox v-for="item in allList.area" :label="item" :key="item" :disabled="item==='TX'||item==='GA'||item==='WA'">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="search_list">
          <h3 style="color:#999;margin-bottom:5px">客户类型：</h3>
          <el-checkbox-group v-model="checkedList.cusType">
            <el-checkbox v-for="item in allList.cusType" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="proList">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align='center' label="图片">
            <template slot-scope="props">
              <img style="width:50px" :src="props.row.img" alt="">
            </template>
          </el-table-column>
          <el-table-column align='center' label="客户类型" prop="channel">
          </el-table-column>
          <el-table-column align='center' label="描述" prop="price">
          </el-table-column>
          <el-table-column align='center' label="地址" prop="profit">
          </el-table-column>
          <el-table-column align='center' label="评分">
            <template slot-scope="props">
              <div class="block">
                <el-rate v-model="props.row.star" disabled></el-rate>
              </div>
              <span style='font-size:14px;color:rgb(247, 186, 42);margin-left:5px;'>{{props.row.star}}</span>
            </template>
          </el-table-column>
          <el-table-column align='center' label="详情">
            <template slot-scope="props">
              <i class="iconfont icon-iconfontgengduo" :data-proid="props.row.id"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="paginations">
        <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="paginations.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
//复选框全部数据
const category = ["RECLINER", "OFFICE CHAIR", "BAR STOOL", "DINING CHAIR"];
const area = ["CA", "NY", "TX", "GA", "WA"];
const cusType = [
  "Furniture Store",
  "Home Goods Store",
  "Store",
  "General Contractor"
];
export default {
  data() {
    return {
      checkedList: {
        category: [],
        area: [],
        cusType: []
      }, //选中时的数据
      allList: {
        category,
        area,
        cusType
      }, //全部待选项
      tableData: [],//搜索结果列表
      paginations: {
        total: 500
      }
    };
  },
  methods: {
    //发送条件数据，请求产品列表
    getProList() {
      this.$axios.get("").then(res => {
        console.log(res);
      });
    },

    //分页
    changePage(val){
      console.log(val)
    }
  },
  watch: {
    "checkedList.category"(nv, ov) {
      // console.log(this.checkedList);
    },
    "checkedList.area"(nv, ov) {
      // console.log(this.checkedList);
    },
    "checkedList.cusType"(nv, ov) {
      // console.log(this.checkedList);
    }
  },
  mounted(){
    //获取全部产品数据
    this.$axios.get('').then(res=>{
      console.log(res);
    })
  }
};
</script>
<style>
@import url("../../assets/css/cusDev/cusDig.css");
</style>


