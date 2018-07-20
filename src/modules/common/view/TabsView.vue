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
    public perTab: string = '0'
    /*vue-compute*/
    get activeTab() {
      return this.selectedTab
    }
    set activeTab(val) {
      this.perTab = this.activeTab
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
      const perTab = this.perTab // 保存住跳转前的tab
      this.$nextTick(() => {
        // 此时，激活的选项卡已经改变，再手动改回去，
        // 此处理是为了实现，点击选项卡后，如果页面被拦截没有跳转的话，tab页应该也不能改变激活的选项卡
        // 而只有当路由真的跳转后，再更新激活的选项卡。
        this.updateSelectedTab(perTab)
        const item = this.menuTabs.find((item: any) => item.key === tab.name)
        if (item) {
          this.$router.push(item.url)
        }
      })
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