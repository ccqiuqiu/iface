<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <div>
    <div class="tip" flex="box:last">
      <span>使用v-charts库</span>
      <a href="https://v-charts.js.org/#/histogram" target="_blank">查看v-charts文档</a>
    </div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">基本示例</span>
      </div>
      <ve-histogram :data="chartData"></ve-histogram>
    </el-card>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">柱状图+折线图</span>
      </div>
      <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    </el-card>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class ChartHistogram extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    public chartData: any = {
      columns: ['日期', '访问用户', '下单用户', '下单率'],
      rows: [
        { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
      ],
    }
    public chartSettings: any = {
      showLine: ['下单用户'],
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>
Missing trailing comma
