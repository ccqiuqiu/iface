<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div data-flex="cross:center" class="header">
    <div class="logo">logo</div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component class HeaderView extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .header{
    background-color: $color-primary;
    color: $color-white;
    height: 50px;

    .logo{
      width: 200px;
      background-color: mix($color-black, $color-primary, 10%);
    }
  }
</style>
