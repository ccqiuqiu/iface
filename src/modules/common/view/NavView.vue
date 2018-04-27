<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <div flex="cross:center">
    <cc-icon name="menu" :rotate="menuExpand? 0 : 90" @click="toggleMenu"/>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {State, Mutation} from 'vuex-class'

  @Component
  export default class NavView extends Vue {
    @State((state: Store.State) => state.common.menuExpand) private menuExpand: string
    @Mutation('toggleMenu') private toggleMenuMutation: () => void

    private toggleMenu() {
      this.toggleMenuMutation()
    }
  }
</script>

<style lang="less" scoped>
</style>