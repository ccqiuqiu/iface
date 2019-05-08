<!--Created by 熊超超 on 2018/7/23.-->
<template>
  <div>
    <dashboard-title :dashboard="dashboard" :more="data && !!data.link" @click="titleClick"></dashboard-title>
    <div class="p-10 list" v-if="data">
      <div v-for="(item, index) in data.rows" :key="index" class="b-b p-v-6">
        <div class="f-14 m-b-2 ignore cp to" @click="itemClick(item)">{{item.title}}</div>
        <div class="c-info to">{{item.subTitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
import DashboardTitle from './DashboardTitle.vue'

export default @Component({ components: { DashboardTitle } }) class DashboardItemList extends Vue {
  /* vue-props */
  @Prop() dashboard
  @Prop(Object) data
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  itemClick (item) {
    this.$router.push(item.url)
  }
  titleClick () {
    this.$router.push(this.data.link)
  }
}
</script>

<style lang="scss" scoped>
  .list .b-b:last-child{
    border: 0;
  }
  .list >div:first-child{
    padding-top: 0;
  }
</style>
