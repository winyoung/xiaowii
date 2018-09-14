<template>
    <div>
        <div class="chengkai"></div>
        <div class="title"><span style="font-size:20px;color:#8f8f8f;margin-left:20px">新品开发</span></div>
        <div class="new_pro_dev">
            <!-- 条件搜索 -->
            <div class="search">
                <h3 style="margin-left:30px;margin-top:10px">请输入想开发产品信息:</h3>
                <div class="search_dv">
                    <span>产品尺寸（宽 x 深 x 高）：</span><input type="number" v-model="searchData.pro.x" placeholder="lnches"> x <input type="number" v-model="searchData.pro.z" placeholder="lnches"> x <input type="number" v-model="searchData.pro.y" placeholder="lnches">
                </div>
                <div class="search_dv">
                    <span>包装尺寸（宽 x 深 x 高）：</span><input type="number" v-model="searchData.pack.x" placeholder="lnches"> x <input type="number" v-model="searchData.pack.z" placeholder="lnches"> x <input type="number" v-model="searchData.pack.y" placeholder="lnches">
                </div>
                <div class="search_dv">
                    <span style="margin-left:42px">产品成本（$USD）:</span>
                    <input type="number" v-model="searchData.cost">
                </div>
                <div class="search_dv">
                    <span style="margin-left:60px">产品毛重（lbs）:</span>
                    <input type="number" v-model="searchData.grossWeight">
                </div>
                <div class="search_dv">
                    <el-select clearable placeholder="选择颜色" v-model="searchData.color">
                        <el-option v-for="(item, index) in selectData.color" :key="index" :value="item">
                        </el-option>
                    </el-select>
                    <el-select clearable placeholder="选择材质" v-model="searchData.texture">
                        <el-option v-for="(item, index) in selectData.texture" :key="index" :value="item">
                        </el-option>
                    </el-select>
                    <el-select clearable placeholder="选择功能" v-model="searchData.function">
                        <el-option v-for="(item, index) in selectData.function" :key="index" :value="item">
                        </el-option>
                    </el-select>
                    <el-select clearable placeholder="选择品类" v-model="searchData.category">
                        <el-option v-for="(item, index) in selectData.category" :key="index" :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="submitBtn">
                    <button @click="submitSearchData()">确定</button>
                </div>
            </div>
            <!-- 搜索结果列表 -->
            <!-- 产品列表 -->
            <div class="proList">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column align='center' label="序号" prop="id">
                    </el-table-column>
                    <el-table-column align='center' label="图片">
                        <template slot-scope="props">
                            <img style="width:50px" :src="props.row.img" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column align='center' label="销售渠道" prop="channel">
                    </el-table-column>
                    <el-table-column align='center' label="售价" prop="price">
                    </el-table-column>
                    <el-table-column align='center' label="预估利润" prop="profit">
                    </el-table-column>
                    <el-table-column align='center' label="预估利润率" prop="profitMargin">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

</template>
<style>
@import url("../../assets/css/proDev/newProDev.css");
</style>
<script>
export default {
  data() {
    return {
      searchData: {
        pro: {
          x: "",
          y: "",
          z: ""
        },
        pack: {
          x: "",
          y: "",
          z: ""
        },
        cost: "",
        grossWeight: "",
        color: "",
        texture: "",
        function: "",
        category: ""
      }, //条件搜索各项数据
      selectData: {
        color: [],
        texture: [],
        function: [],
        category: []
      }, //条件搜索下拉框数据
      tableData:[],//搜索结果列表
    };
  },
  methods: {
    //条件搜索按钮提交
    submitSearchData() {
    //   console.log(this.searchData);
      //此处提交数据
      //this.$axios.get().then(res=>{console.log(res)})
      //提交数据后会拿到十个产品数据，并渲染
      this.$axios
        .get(
          "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/newProList"
        )
        .then(res => {
        //   console.log(res.data);
          this.tableData = res.data.data;
        });
    }
  },
  mounted() {
    //获取下拉框数据
    this.$axios
      .get(
        "https://www.easy-mock.com/mock/5b8cacaa5ae7a7318a66513b/example/newProInputVal"
      )
      .then(res => {
        //   console.log(res.data);
        this.selectData.color = res.data.anyanse;
        this.selectData.texture = res.data.ancaizhi;
        this.selectData.function = res.data.angongneng;
        this.selectData.category = res.data.anpinlei;
      });
  }
};
</script>