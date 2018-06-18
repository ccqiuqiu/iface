<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane
        :key="item.name"
        v-for="item in tabs"
        :label="item.title"
        :closable="!item.noClose"
        :name="item.name">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

@Component
export default class TabsView extends Vue {
  /* vue-props */
  /* vue-vuex */
  @State((state) => state.common.menuTabs) menuTabs
  @State((state) => state.common.selectedTab) selectedTab
  @Mutation updateSelectedTab
  @Mutation removeTab
  /* vue-data */
  /* vue-compute */
  get activeTab () {
    return this.selectedTab
  }
  set activeTab (val) {
    this.updateSelectedTab(val)
  }
  get tabs () {
    const menus = this.menuTabs.map((o) => {
      const menu = o.menus[o.menus.length - 1]
      return {
        title: menu.name,
        name: o.key,
        noClose: menu.noClose
      }
    })
    // menus.unshift({title: '首页', name: '0', noClose: true})
    return menus
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  // 点击tab的时候，要跳转相应的url
  clickTab (tab) {
    const item = this.menuTabs.find((item) => item.key === tab.name)
    if (item) {
      const menu = item.menus[item.menus.length - 1]
      this.$router.push(menu.url)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-tabs--border-card{
    border-left: 0;
    border-right: 0;
    /deep/ .el-tabs__content{
      padding: 0;
    }
  }
</style>
