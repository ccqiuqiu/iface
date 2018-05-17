<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <el-menu
      class="left-menu"
      router
      :default-active="selectedTab"
      :collapse="!menuExpand"
      @select="selectMenu">
    <template v-for="menu in menus">
      <el-submenu :index="menu.id" v-if="menu.children" :key="menu.id">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <el-menu-item v-for="menu2 in menu.children" :index="menu2.id" :key="menu2.id" :route="{path: menu2.url}">{{menu2.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item :index="menu.id" v-else :route="{path: menu.url}" :key="menu.id">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
  import {Component, Watch, Vue} from 'vue-property-decorator'
  import { State, Action, Mutation} from 'vuex-class'

  @Component
  export default class MenuView extends Vue {
    @State((state: State) => state.common.menus) private menus: any[]
    @State((state: State) => state.common.menuExpand) private menuExpand: string
    @State((state: State) => state.common.menuTabs) private menuTabs: any[]
    @State((state: State) => state.common.selectedTab) private selectedTab: string
    @Action('getMenu') private getMenuAction: () => void
    @Mutation('updateTabs') private updateTabsMutation: (params: {key: string, menus: Menu[]}) => void
    @Mutation('updateSelectedTab') private updateSelectedTabMutation: (key: string) => void

    private activeMenuIndexPath: string[] = []

    get flatMenu() {
      return this.$utils.flatObject(this.menus)
    }
    get activeMenu(): string {
      return this.selectedTab
    }
    set activeMenu(val) {
      this.updateSelectedTabMutation(val)
    }

    @Watch('activeMenu')
    private activeMenuChange() {
      if (this.selectedTab === '0') {
        return
      }
      // 点击菜单的时候，取到当前菜单和所有上级菜单的数组（层级数组），用于nav显示
      // 并且把这个数组整体放到一个数组，用于tabs显示
      // 点击tabs的时候，取到点击的菜单层级数组， 替换nav显示
      // 数据结构类似 [{key: '1', menus: [{一级菜单}, {二级菜单}]}, {}...]
      // const key: string = val.join('_')
      const val = this.activeMenuIndexPath
      const menus: Menu[] = val.map((id: string) => {
        return this.flatMenu.find((m: Menu) => m.id === id)
      })
      // 如果menuTabs不存在，表示是新开一个标签
      const item = this.menuTabs.find((o: any) => o.key === this.selectedTab)
      if (!item) {
        this.updateTabsMutation({key: this.selectedTab, menus})
      }
    }

    private selectMenu(index: string, indexPath: string[]): void {
      this.activeMenu = index
      this.activeMenuIndexPath = indexPath
    }
    private created(): void {
      this.getMenuAction()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .left-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .left-menu /deep/{
    background-color: mix($--color-black, $--color-primary, 80%);

    .el-submenu__title, .el-menu-item{
      color: white;
    }
    .is-active{
      color: $--color-primary;
    }
    .el-menu{
      background-color: mix($--color-black, $--color-primary, 60%);
      .el-menu-item:focus{
        background-color: inherit;
      }
    }
    .el-menu-item:focus{
      background-color: inherit;
    }
    .el-submenu__title:hover, .el-menu-item:hover{
      background-color: mix($--color-black, $--color-primary, 70%);
    }
  }
</style>