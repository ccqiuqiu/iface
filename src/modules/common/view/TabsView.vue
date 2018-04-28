<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <el-tabs v-model="activeTab" type="border-card" @tab-remove="removeTab">
    <el-tab-pane
        :key="item.name"
        v-for="item in editableTabs"
        :label="item.title"
        :closable="!item.noClose"
        :name="item.name">
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class TabsView extends Vue {

    private activeTab: string = '2'  // 激活的标签name
    private editableTabs: any[] = [
      {title: 'tab1', name: '1', noClose: true},
      {title: 'tab2', name: '2'},
    ]

    private removeTab(targetName: string) {
      const tabs = this.editableTabs
      let activeName = this.activeTab
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab: any = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.activeTab = activeName
      this.editableTabs = tabs.filter((tab: any) => tab.name !== targetName)
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