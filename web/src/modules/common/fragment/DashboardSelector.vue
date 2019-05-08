<!--Created by 熊超超 on 2018/7/19.-->
<template>
  <div>
    <!--<slot text="aaa">这是示范jsx中使用slot-scope</slot>-->
    <div flex='main:center'>
      <el-transfer
          :titles="['可选', '已选']" v-model="mSelected" :data="allDashboard">
      </el-transfer>
    </div>
    <div flex='main:right' class='m-t-20'><cc-button @click="onSelected" text="确定"></cc-button></div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Action } from 'vuex-class'

export default @Component class DashboardSelector extends Vue {
  /* vue-props */
  @Prop(Array) value
  /* vue-vuex */
  @Action getAllDashboard
  /* vue-data */
  allDashboard = []
  data () {
    return {
      mSelected: this.value
    }
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.initData()
  }
  /* vue-method */
  async initData () {
    const { data } = await this.getAllDashboard()
    if (data) {
      this.allDashboard = data.map((dashboard) => ({ key: dashboard.id, label: dashboard.name, dashboard }))
    }
  }
  onSelected () {
    const dashboards = this.allDashboard.filter((item) => this.mSelected.includes(item.key))
      .map((item) => item.dashboard)
    this.$emit('selected', dashboards)
  }
}
</script>

<style lang="scss" scoped>
</style>
