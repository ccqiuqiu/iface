<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div v-loading="loading">
    <dashboard-item-info v-if="dashboard.type === $c.DashboardTypeV.信息面板" :data="data" :dashboard="dashboard"></dashboard-item-info>
    <dashboard-item-list v-else-if="dashboard.type === $c.DashboardTypeV.列表" :data="data" :dashboard="dashboard"></dashboard-item-list>
    <dashboard-item-table v-else-if="dashboard.type === $c.DashboardTypeV.表格" :data="data" :dashboard="dashboard" @change-page="changePage"></dashboard-item-table>
    <dashboard-item-chart v-else :data="data" :dashboard="dashboard" v-bind="$attrs"></dashboard-item-chart>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import {BaseMixin} from '@utils/mixins'
  import DashboardItemInfo from './DashboardItemInfo.vue'
  import DashboardItemList from './DashboardItemList.vue'
  import DashboardItemTable from './DashboardItemTable.vue'
  import DashboardItemChart from './DashboardItemChart.vue'

  @Component({mixins: [BaseMixin], components: {DashboardItemInfo, DashboardItemList, DashboardItemTable, DashboardItemChart}})
  export default class DashboardItem extends Vue {
    /*vue-props*/
    @Prop() public dashboard: Dashboard
    /*vue-vuex*/
    @Action public getDashboardData: (params: {url: string, params: any}) => Promise<ActionReturn>
    /*vue-data*/
    public data: {title: string, subTitle: string, link: string} | null = null
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    public created() {
      this.initData()
    }
    /*vue-method*/
    public async initData(params: any = {pageSize: 5}) {
      this.loading = true
      const {data} = await this.getDashboardData({url: this.dashboard.url, params})
      this.loading = false
      if (data) {
        this.data = data
      }
    }
    public changePage(pageNum: number) {
      this.initData({pageNum, pageSize: 5})
    }
  }
</script>

<style lang="scss" scoped>
</style>