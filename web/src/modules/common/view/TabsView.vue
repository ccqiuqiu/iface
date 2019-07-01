<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <div class="tab-view">
    <el-tabs class="h-100" v-model="activeTab" type="border-card" @tab-remove="removeTab" @tab-click="clickTab">
      <el-tab-pane
          :key="item.id"
          v-for="item in menuTabs"
          :label="item.title"
          :closable="!item.noClose"
          :name="item.id">
        <component :is="$tab.getComponent(item)"></component>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown trigger="click" class="action" data-flex="cross:center"
                 @command="removeTabs" @visible-change="toggleMenuVisible">
      <span class="p-h-4 p-v-10 cp" :class="{'menu-visible': menuVisible}"><i class="el-icon-arrow-down"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="noActive">关闭未激活</el-dropdown-item>
        <el-dropdown-item command="left">关闭左边</el-dropdown-item>
        <el-dropdown-item command="right">关闭右边</el-dropdown-item>
        <el-dropdown-item command="all" divided>关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import {State, Mutation} from 'vuex-class'

export default @Component class TabsView extends Vue {
  /* vue-props */
  /* vue-vuex */
  @State((state) => state.common.menuTabs) menuTabs
  @State((state) => state.common.selectedTab) selectedTab
  @Mutation updateSelectedTab
  /* vue-data */
  perTab = '0'
  menuVisible = false
  /* vue-compute */
  get activeTab () {
    return this.selectedTab
  }
  set activeTab (val) {
    this.perTab = this.activeTab
    this.updateSelectedTab(val)
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  // 点击tab的时候，要跳转相应的url
  clickTab (tab) {
    const perTab = this.perTab // 保存住跳转前的tab
    this.$nextTick(() => {
      // 此时，激活的选项卡已经改变，再手动改回去，
      // 此处理是为了实现，点击选项卡后，如果页面被拦截没有跳转的话，tab页应该也不能改变激活的选项卡
      // 而只有当路由真的跳转后，再更新激活的选项卡。
      this.updateSelectedTab(perTab)
      const item = this.menuTabs.find((item) => item.key === tab.name)
      if (item) {
        this.$router.push(item.url)
      }
    })
  }
  toggleMenuVisible (visible) {
    this.menuVisible = visible
  }
  removeTab (key) {
    this.$utils.removeTab(key)
  }
  removeTabs (command) {
    this.$utils.removeTabs(command)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/vars';

  .tab-view {
    position: relative;
    overflow: hidden;

    .el-tabs {
      display: flex;
      flex-direction: column;

      /deep/ .el-tabs__header{
        padding: 0;
        flex: 0 0 39px;
      }
      /deep/ .el-tabs__content{
        padding: 0;
        flex: 1 1 auto;
        overflow: auto;
      }
    }
  }
  .el-tabs--border-card{
    background: transparent;
    border-left: 0;
    border-right: 0;
  }
  .action {
    position: absolute;
    top: 0;
    right: 0;
    height: 39px;
    background-color: #f5f7fa;
    /*border-bottom: 1px solid #e4e7ed;*/
    border-left: 1px solid #e4e7ed;
  }
  .el-dropdown {
    span:focus{
      outline: none;
    }
    i{
      transition: all 0.3s;
    }
    .menu-visible i{
      transform: rotate(180deg);
    }
  }
</style>
