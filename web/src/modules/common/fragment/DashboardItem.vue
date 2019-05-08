<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div v-loading="loading">
    <dashboard-item-info v-if="dashboard.type === $c.DashboardTypeV.信息面板" :data="data" :dashboard="dashboard"></dashboard-item-info>
    <dashboard-item-list v-else-if="dashboard.type === $c.DashboardTypeV.列表" :data="data" :dashboard="dashboard"></dashboard-item-list>
    <dashboard-item-table v-else-if="dashboard.type === $c.DashboardTypeV.表格" :data="data" :dashboard="dashboard" @change-page="changePage"></dashboard-item-table>
    <dashboard-item-chart v-else :data="data" :dashboard="dashboard" v-bind="$attrs"></dashboard-item-chart>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { BaseMixin } from '../../../assets/utils/mixins'
import DashboardItemInfo from './DashboardItemInfo.vue'
import DashboardItemList from './DashboardItemList.vue'
import DashboardItemTable from './DashboardItemTable.vue'
import DashboardItemChart from './DashboardItemChart.vue'

export default @Component({ mixins: [BaseMixin], components: { DashboardItemInfo, DashboardItemList, DashboardItemTable, DashboardItemChart } })
class DashboardItem extends Vue {
  /* vue-props */
  @Prop() dashboard
  /* vue-vuex */
  @Action getDashboardData
  /* vue-data */
  data = null
  /* vue-compute */
  /* vue-watch */
  @Watch('dashboard.id', { immediate: true })
  idChange () {
    this.initData()
  }
  /* vue-lifecycle */
  /* vue-method */
  async initData (params = { pageSize: 5 }) {
    this.loading = true
    const { data } = await this.getDashboardData({ url: this.dashboard.url, params })
    this.loading = false
    if (data) {
      this.data = data
    }
  }
  changePage (pageNum) {
    this.initData({ pageNum, pageSize: 5 })
  }
}
</script>

<style lang="scss" scoped>
</style>
