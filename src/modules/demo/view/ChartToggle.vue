<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <div>
    <div class="tip" flex="box:last">
      <span>使用v-charts库</span>
      <a href="https://v-charts.js.org/#/toggle" target="_blank">查看v-charts文档</a>
    </div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">基本示例</span>
        <cc-button size="small" type="primary" text="切换图表" @click="changeType"/>
      </div>
      <ve-chart :data="chartData" :settings="chartSettings"></ve-chart>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Chart extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    private index: number = 0
    private typeArr: string[] = ['line', 'histogram', 'pie']
    private chartData: any = {
      columns: ['日期', '销售额-1季度'],
      rows: [
        { '日期': '1月1日', '销售额-1季度': 1523 },
        { '日期': '1月2日', '销售额-1季度': 1223 },
        { '日期': '1月3日', '销售额-1季度': 2123 },
        { '日期': '1月4日', '销售额-1季度': 4123 },
        { '日期': '1月5日', '销售额-1季度': 3123 },
        { '日期': '1月6日', '销售额-1季度': 7123 },
      ],
    }
    /*vue-compute*/
    get chartSettings() {
      return{ type: this.typeArr[this.index] }
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    private changeType() {
      this.index++
      if (this.index === this.typeArr.length) {
        this.index = 0
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>