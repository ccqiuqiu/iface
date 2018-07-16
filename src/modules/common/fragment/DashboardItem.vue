<!--Created by 熊超超 on 2018/7/16.-->
<template>
  <div>
    {{data}}
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class DashboardItem extends Vue {
    /*vue-props*/
    @Prop() public data: any
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>