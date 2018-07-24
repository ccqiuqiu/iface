<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div class="h-100">
    <dashboard-title :dashboard="dashboard" :more="data && !!data.link"></dashboard-title>
    <div class="m-10">
      <ve-map v-if="dashboard.type === $c.DashboardTypeV['图表-地图']" ref="chart" v-bind="chartData"></ve-map>
      <ve-sankey v-else-if="dashboard.type === $c.DashboardTypeV['图表-桑基图']" ref="chart" v-bind="chartData"></ve-sankey>
      <ve-heatmap v-else-if="dashboard.type === $c.DashboardTypeV['图表-热力图']" ref="chart" v-bind="chartData"></ve-heatmap>
      <ve-scatter v-else-if="dashboard.type === $c.DashboardTypeV['图表-散点图']" ref="chart" v-bind="chartData"></ve-scatter>
      <ve-candle v-else-if="dashboard.type === $c.DashboardTypeV['图表-K线图']" ref="chart" v-bind="chartData"></ve-candle>
      <ve-gauge v-else-if="dashboard.type === $c.DashboardTypeV['图表-仪表盘']" ref="chart" v-bind="chartData"></ve-gauge>
      <ve-tree v-else-if="dashboard.type === $c.DashboardTypeV['图表-树图']" ref="chart" v-bind="chartData"></ve-tree>
      <ve-chart v-else ref="chart" v-bind="chartData"></ve-chart>
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
    @Prop(Object) public data: {data: any [], settings: any}
    /*vue-vuex*/
    /*vue-data*/
    public index: number = 0
    public typeArr: string[] = ['line', 'histogram', 'pie']
    /*vue-compute*/
    get height() {
      if (this.size && this.size.h) {

        if ([this.$c.DashboardTypeV['图表-饼图'], this.$c.DashboardTypeV['图表-环形图'],
          this.$c.DashboardTypeV['图表-桑基图'], this.$c.DashboardTypeV['图表-热力图']]
          .includes(this.dashboard.type)) {
          return this.size.h + 'px'
        } else {
          // 除了上面的几类图表，其他的高度底部空位较多，所以高度加50
          return this.size.h + 50 + 'px'
        }
      }
      return '300px'
    }
    get chartData() {
      if (!this.data) {
        return {}
      }
      const data: any = {}
      data.data = this.data.data
      data.settings = {type: this.dashboard.type, ...this.data.settings}
      data.settings = {type: this.dashboard.type, ...this.data.settings}
      data.height = this.height
      data.width = 'auto'
      data.judgeWidth = true
      return data
    }
    /*vue-watch*/
    @Watch('size', {deep: true})
    public sizeChange() {
      (this.$refs.chart as Vue).resize()
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