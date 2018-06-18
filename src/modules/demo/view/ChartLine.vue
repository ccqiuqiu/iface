<!--Created by 熊超超 on 2018/5/29.-->
<template>
  <div>
    <div class="tip" flex="box:last">
      <span>使用v-charts库</span>
      <a href="https://v-charts.js.org/#/line" target="_blank">查看v-charts文档</a>
    </div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">基本示例</span>
      </div>
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </el-card>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">堆叠面积图</span>
      </div>
      <ve-line :data="chartData" :settings="chartSettings2"></ve-line>
    </el-card>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ChartLine extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  chartData = {
    columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
    rows: [
      { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
      { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
      { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
      { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
      { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
      { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
    ]
  }
  chartSettings = {}
  chartSettings2 = {area: true}
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
</style>
