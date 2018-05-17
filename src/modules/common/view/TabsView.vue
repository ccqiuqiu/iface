<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
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
    @Mutation('updateSelectedTab') private updateSelectedTabMutation: (key: string) => void
    @Mutation('removeTab') private removeTabMutation: (key: string) => void

    get activeTab() {
      return this.selectedTab
   }
   set activeTab(val) {
     this.updateSelectedTabMutation(val)
   }

    get tabs() {
      const menus = this.menuTabs.map((o: any) => {
        const menu: Menu = o.menus[o.menus.length - 1]
        return {
          title: menu.name,
          name: o.key,
        }
      })
      menus.unshift({title: '首页', name: '0', noClose: true})
      return menus
    }

    private removeTab(targetName: string) {
      this.removeTabMutation(targetName)

      // const tabs = this.editableTabs
      // let activeName = this.activeTab
      // if (activeName === targetName) {
      //   tabs.forEach((tab, index) => {
      //     if (tab.name === targetName) {
      //       const nextTab: any = tabs[index + 1] || tabs[index - 1]
      //       if (nextTab) {
      //         activeName = nextTab.name
      //       }
      //     }
      //   })
      // }
      // this.activeTab = activeName
      // this.editableTabs = tabs.filter((tab: any) => tab.name !== targetName)
    }
  }
</script>

<style lang="less" scoped>
  .el-tabs--border-card{
    border-left: 0;
    border-right: 0;
    /deep/ .el-tabs__content{
      padding: 0;
    }
  }
</style>