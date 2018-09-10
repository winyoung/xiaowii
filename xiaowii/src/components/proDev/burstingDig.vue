<template>
    <div class="hot_sale">
        <!-- 条件搜索 -->
        <div class="search">
            <el-select clearable   v-model='selectVal.channelvalue' placeholder="渠道">
                <el-option v-for="(item,index) in ulForSelectData.channel" :key="index" :value="item">
                </el-option>
            </el-select>
            <el-select clearable  v-model='selectVal.texturevalue' placeholder="材质">
                <el-option v-for="(item,index) in ulForSelectData.texture" :key="index" :value="item">
                </el-option>
            </el-select>
            <el-select clearable  v-model='selectVal.colorvalue' placeholder="颜色">
                <el-option v-for="(item,index) in ulForSelectData.color" :key="index" :value="item">
                </el-option>
            </el-select>
            <el-select clearable  v-model='selectVal.functionvalue' placeholder="功能">
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
            
        </div>
    </div>
</template>
<style>
@import url("../../assets/css/proDev/burstingDig.css");
</style>
<script>
export default {
  data() {
    return {
      searchUlShow: false, //ul是否显示
      ulForSelectData: {
        channel: [],
        texture: [],
        color: [],
        function: []
      }, //各个下拉框数据
      selectVal:{
        channelvalue:'',
        texturevalue:'',
        colorvalue:'',
        functionvalue:'',
        keywords:''
      },//input框选定数据
    };
  },
  methods: {
    //条件搜素提交按钮点击
    submitSearch(){
        var data=this.selectVal;
        console.log(data);
        //此处提交数据
        // this.$axios.get....
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
  },
  components: {}
};
</script>