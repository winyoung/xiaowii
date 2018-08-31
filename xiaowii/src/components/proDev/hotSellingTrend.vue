<template>
    <div class="hot_selling_trend">
        这是热卖趋势页
    </div>
</template>
<style lang="less">
  .hot_selling_trend{
      position: absolute;
      top:100px;
      z-index: -1;
  }
</style>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        // this.$store.commit('toggleShow', {isShow: false});
        // console.log(this.$store.state.isShow, 'hotsell');
    }
}
</script>

