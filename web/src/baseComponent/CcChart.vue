<!--Created by 熊超超 on 2018/7/24.-->
<template>
  <div>
    <ve-map v-if="type === $c.DashboardTypeV['图表-地图']" ref="chart" v-bind="$attrs"></ve-map>
    <ve-sankey v-else-if="type === $c.DashboardTypeV['图表-桑基图']" ref="chart" v-bind="$attrs"></ve-sankey>
    <ve-heatmap v-else-if="type === $c.DashboardTypeV['图表-热力图']" ref="chart" v-bind="$attrs"></ve-heatmap>
    <ve-scatter v-else-if="type === $c.DashboardTypeV['图表-散点图']" ref="chart" v-bind="$attrs"></ve-scatter>
    <ve-candle v-else-if="type === $c.DashboardTypeV['图表-K线图']" ref="chart" v-bind="$attrs"></ve-candle>
    <ve-gauge v-else-if="type === $c.DashboardTypeV['图表-仪表盘']" ref="chart" v-bind="$attrs"></ve-gauge>
    <ve-tree v-else-if="type === $c.DashboardTypeV['图表-树图']" ref="chart" v-bind="$attrs"></ve-tree>
    <ve-chart v-else ref="chart" v-bind="$attrs"></ve-chart>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component class CcChart extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  get type () {
    return this.$attrs.settings.type || 'line'
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  resize () {
    this.$refs.chart.resize()
  }
}
</script>

<style lang="scss" scoped>
</style>
