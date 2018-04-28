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
  import {Component, Watch} from 'vue-property-decorator'
  import { State, Action, Mutation} from 'vuex-class'
  import BaseVue from '../../../baseComponent/base/BaseVue'

  @Component
  export default class MenuView extends BaseVue {
    @State((state: State) => state.common.menus) private menus: any[]
    @State((state: State) => state.common.menuExpand) private menuExpand: string
    @Action('getMenu') private getMenuAction: () => void
    @Mutation('updateNav') private updateNavMutation: (menu: Menu[]) => void

    private activeMenu: string = ''
    private activeMenuIndexPath: string[] = []

    get flatMenu() {
      return this.utils.flatObject(this.menus)
    }

    @Watch('activeMenuIndexPath')
    private activeMenuIndexPathChange(val: string[]) {
      // todo 修改一下这个方法，点击菜单的时候，取到当前菜单和所有上级菜单的数组（层级数组），用于nav显示
      // 并且把这个数组整体放到一个对象，用于tabs显示
      // 点击tabs的时候，取到点击的菜单层级数组， 替换nav显示
      // 数据结构类似 {1_1: [{一级菜单}, {二级菜单}], 2_1: []...}
      const menus: Menu[] = val.map((id: string) => {
        return this.flatMenu.find((m: Menu) => m.id === id)
      })
      this.updateNavMutation(menus)
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