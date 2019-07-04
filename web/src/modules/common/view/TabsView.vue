<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <div class="tab-view">
    <el-tabs class="main-tab" v-model="activeTab" type="border-card" @tab-remove="removeTab">
      <el-tab-pane
          :key="item.id"
          v-for="item in menuTabs"
          :label="item.title"
          :closable="!item.noClose"
          :name="item.id">
        <span slot="label" class="label">{{item.title}} <i @click="refresh(item.id)" v-if="selectedTab === item.id" class="el-icon-refresh"></i></span>
          <component :is="$tab.getComponent(item)" class="content-view"></component>
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
  menuVisible = false
  /* vue-compute */
  get activeTab () {
    return this.selectedTab
  }
  set activeTab (val) {
    this.updateSelectedTab(val)
    // 切换一下url
    const url = this.$tab.getCurUrl(val)
    url && this.$router.push(url)
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  toggleMenuVisible (visible) {
    this.menuVisible = visible
  }
  removeTab (key) {
    this.$tab.closeTab(key)
  }
  removeTabs (command) {
    this.$tab.closeTabs(command)
  }
  refresh (id) {
    this.$bus.$emit('refresh-' + id)
    // this.$tab.refresh(id)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/vars';

  .tab-view {
    position: relative;
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
      transform: rotate(180deg) translateZ(0);
    }
  }
  .label i:hover{
    transform:rotate(180deg) translateZ(0);
    transition:transform 0.5s linear;
  }
</style>
