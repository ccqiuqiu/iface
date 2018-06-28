<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <div>
    <div class="tip" flex="box:last">
      <span>使用v-charts库</span>
      <a href="https://v-charts.js.org/#/ring" target="_blank">查看v-charts文档</a>
    </div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">基本示例</span>
      </div>
      <ve-ring :data="chartData"></ve-ring>
    </el-card>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">玫瑰图</span>
      </div>
      <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
    </el-card>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class ChartRing extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    public chartData: any = {
      columns: ['日期', '访问用户'],
      rows: [
        { 日期: '1/1', 访问用户: 1393 },
        { 日期: '1/2', 访问用户: 3530 },
        { 日期: '1/3', 访问用户: 2923 },
        { 日期: '1/4', 访问用户: 1723 },
        { 日期: '1/5', 访问用户: 3792 },
        { 日期: '1/6', 访问用户: 4593 },
        ],
    }
    public chartSettings: any = {
      roseType: 'radius',
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>