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

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import { State, Action, Mutation} from 'vuex-class'

  @Component
  export default class TabsView extends Vue {
    @State((state: State) => state.common.menuTabs) private menuTabs: any
    @State((state: State) => state.common.selectedTab) private selectedTab: any
    @Mutation private updateSelectedTab: (key: string) => void
    @Mutation private removeTab: (key: string) => void

    get activeTab() {
      return this.selectedTab
    }
    set activeTab(val) {
      this.updateSelectedTab(val)
    }
    get tabs() {
      const menus = this.menuTabs.map((o: any) => {
        const menu: Menu = o.menus[o.menus.length - 1]
        return {
          title: menu.name,
          name: o.key,
          noClose: menu.noClose,
        }
      })
      // menus.unshift({title: '首页', name: '0', noClose: true})
      return menus
    }
    private clickTab(tab: any) {
      const item = this.menuTabs.find((item: any) => item.key === tab.name)
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