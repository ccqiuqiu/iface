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
    /*vue-props*/
    /*vue-vuex*/
    @State((state: State) => state.common.menuTabs) public menuTabs: any
    @State((state: State) => state.common.selectedTab) public selectedTab: any
    @Mutation public updateSelectedTab: (key: string) => void
    @Mutation public removeTab: (key: string) => void
    /*vue-data*/
    /*vue-compute*/
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
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    // 点击tab的时候，要跳转相应的url
    public clickTab(tab: any) {
      const item = this.menuTabs.find((item: any) => item.key === tab.name)
      if (item) {
        this.$router.push(item.url)
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