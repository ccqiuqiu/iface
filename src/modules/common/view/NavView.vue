<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <div flex="cross:center" class="p-10 bs-card">
    <cc-icon name="menu" :rotate="menuExpand? 0 : 90" @click="toggleMenu"/>
    <el-breadcrumb separator="/" class="m-l-10">
      <el-breadcrumb-item v-for="menu in nav" :key="menu.id" :to="{ path: menu.url }">{{menu.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'
  import {State, Mutation} from 'vuex-class'
  import BaseVue from '../../../baseComponent/base/BaseVue'

  @Component
  export default class NavView extends BaseVue {
    @State((state: State) => state.common.menuExpand) private menuExpand: string
    @State((state: State) => state.common.nav) private nav: Menu[]
    @Mutation('toggleMenu') private toggleMenuMutation: () => void

    private toggleMenu() {
      this.toggleMenuMutation()
    }
  }

</script>

<style lang="less" scoped>
</style>