<template>
    <div class="hot_sale">
        这是爆款热卖页
    </div>
</template>
<style lang="less">
  .hot_sale{
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