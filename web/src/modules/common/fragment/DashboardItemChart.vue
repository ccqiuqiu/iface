<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div class="h-100">
    <dashboard-title :dashboard="dashboard" :more="data && !!data.link"></dashboard-title>
    <cc-chart class="m-10" ref="chart" v-bind="chartData" v-if="chartData.data"></cc-chart>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import DashboardTitle from './DashboardTitle.vue'

export default @Component({ components: { DashboardTitle } }) class DashboardItemChart extends Vue {
  /* vue-props */
  @Prop() dashboard
  @Prop() size
  @Prop(Object) data
  /* vue-vuex */
  /* vue-data */
  index = 0
  typeArr = ['line', 'histogram', 'pie']
  /* vue-compute */
  get height () {
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
  get chartData () {
    if (!this.data) {
      return {}
    }
    const data = {}
    data.data = this.data.data
    data.settings = { type: this.dashboard.type, ...this.data.settings }
    data.height = this.height
    data.width = 'auto'
    data.judgeWidth = true
    return data
  }
  /* vue-watch */
  @Watch('size', { deep: true })
  sizeChange () {
    if (this.$refs.chart) {
      this.$refs.chart.resize()
    }
  }
  /* vue-lifecycle */
  /* vue-method */
  changeType () {
    this.index++
    if (this.index === this.typeArr.length) {
      this.index = 0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
