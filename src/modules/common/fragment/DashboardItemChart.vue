<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div class="h-100">
    <dashboard-title :dashboard="dashboard" :more="data && !!data.link"></dashboard-title>
    <div class="m-10">
      <ve-chart :data="chartData" :settings="chartSettings" :height="height" :width="width" judge-width></ve-chart>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import DashboardTitle from './DashboardTitle.vue'

  @Component({components: {DashboardTitle}})
  export default class DashboardItemChart extends Vue {
    /*vue-props*/
    @Prop() public dashboard: Dashboard
    @Prop() public size: {w: number, h: number}
    @Prop(Object) public data: {title: string, link: string}
    /*vue-vuex*/
    /*vue-data*/
    public height: string = '300px'
    public width: string = 'auto'
    public index: number = 0
    public typeArr: string[] = ['line', 'histogram', 'pie']
    public chartData: any = {
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
    @Watch('size', {deep: true})
    public sizeChange() {
      console.log(1111)
    }
    /*vue-lifecycle*/
    /*vue-method*/
    public changeType() {
      this.index++
      if (this.index === this.typeArr.length) {
        this.index = 0
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>