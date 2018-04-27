<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <el-menu
      class="left-menu"
      background-color="#545c64"
      text-color="#fff"
      router
      :default-active="activeMenu"
      :collapse="!menuExpand"
      @select="selectMenu"
      active-text-color="#ffd04b">
    <template v-for="menu in menus">
      <el-submenu :index="menu.id" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <el-menu-item v-for="menu2 in menu.children" :index="menu2.id" :key="menu2.id" :route="{path: menu2.url}">{{menu2.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item :index="menu.id" v-else :route="{path: menu.url}">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator'
  import { State, Action, Mutation} from 'vuex-class'

  @Component
  export default class MenuView extends Vue {
    @State((state: Store.State) => state.common.menus) private menus: any[]
    @State((state: Store.State) => state.common.menuExpand) private menuExpand: string
    @Action('getMenu') private getMenuAction: () => void
    @Mutation('updateNav') private updateNavMutation: (menu: Store.Menu) => void

    private activeMenu: string = ''
    private activeMenuIndexPath: string[] = []

    @Watch('activeMenuIndexPath')
    private activeMenuIndexPathChange(val: string[]) {
      const id: string = val[0]
      const menu: Store.Menu = this.menus.find((m: Store.Menu) => m.id === id)
      this.updateNavMutation(menu)
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

<style lang="less" scoped>
  .left-menu:not(.el-menu--collapse) {
    width: 200px;
  }
</style>