<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <el-menu
      class="left-menu"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
    <template v-for="menu in menus">
      <el-submenu :index="menu.id" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <el-menu-item v-for="menu2 in menu.children" :index="menu2.id" :key="menu2.id" :route="{path: menu2.url}">{{menu2.name}}</el-menu-item>
      </el-submenu>
      <el-menu-item :index="menu.id" v-else :route="{path: menu.url}">
        <i :class="menu.icon"></i>
        <span>{{menu.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import { State, Action } from 'vuex-class'

  @Component
  export default class MenuView extends Vue {
    @State((state: State) => state.common.menus) private menus!: string
    @Action private getMenu!: () => void

    private created() {
      this.getMenu()
    }
  }
</script>

<style lang="less" scoped>
  .left-menu{
    width: 200px;
  }
</style>