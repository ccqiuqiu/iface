<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div>
    <cc-icon name="component"></cc-icon>
    <el-button>默认按钮</el-button>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'
  // import {mixins} from 'vue-class-component'
  import BaseVue from '@base/BaseVue'

  @Component
  export default class Home extends BaseVue {
  }
</script>

<style lang="less" scoped>
</style>
