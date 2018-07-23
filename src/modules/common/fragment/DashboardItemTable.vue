<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div v-if="data" flex="dir:top box:justify" class="h-100">
    <dashboard-title :dashboard="dashboard" :more="data && !!data.link"></dashboard-title>
    <div>
      <cc-table :rows="data.rows" :columns="data.columns" size="mini"></cc-table>
    </div>
    <el-pagination class="p-10 a-c" small layout="prev, pager, next" :total="data.total" :page-size="1" :current-page.sync="currentPage">
    </el-pagination>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import DashboardTitle from './DashboardTitle.vue'

  @Component({components: {DashboardTitle}})
  export default class DashboardItemTable extends Vue {
    /*vue-props*/
    @Prop() public dashboard: Dashboard
    @Prop(Object) public data: any
    /*vue-vuex*/
    /*vue-data*/
    public currentPage: number = 1
    /*vue-compute*/
    /*vue-watch*/
    @Watch('currentPage')
    public currentPageChange() {
      this.$emit('change-page', this.currentPage)
    }
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>