<!--Created by 熊超超 on 2018/7/19.-->
<template>
  <div>
    <div flex='main:center'>
      <el-transfer
          :titles="['可选', '已选']" v-model="mSelected" :data="allDashboard">
      </el-transfer>
    </div>
    <div flex='main:right' class='m-t-20'><cc-button @click="onSelected" text="确定"></cc-button></div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import {Action} from 'vuex-class'

  @Component
  export default class DashboardSelector extends Vue {
    /*vue-props*/
    @Prop(Array) public value: number[]
    /*vue-vuex*/
    @Action public getAllDashboard: () => Promise<ActionReturn>
    /*vue-data*/
    public allDashboard: any[] = []
    public mSelected: number[] = this.value
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    public created() {
      this.initData()
    }
    /*vue-method*/
    public async initData() {
      const {data} = await this.getAllDashboard()
      if (data) {
        this.allDashboard = data.rows.map((dashboard: Dashboard) => ({key: dashboard.id, label: dashboard.name, dashboard}))
      }
    }
    public onSelected() {
      const dashboards: Dashboard[] = this.allDashboard.filter((item: any) => this.mSelected.includes(item.key))
        .map((item: any) => item.dashboard)
      this.$emit('selected', dashboards)
    }
  }
</script>

<style lang="scss" scoped>
</style>