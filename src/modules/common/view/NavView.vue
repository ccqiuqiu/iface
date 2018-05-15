<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <div flex="cross:center" class="p-10 bs-card">
    <cc-icon name="menu" :rotate="menuExpand? 0 : 90" @click="toggleMenu"/>
    <el-breadcrumb separator="/" class="m-l-10">
      <el-breadcrumb-item v-for="menu in nav" :key="menu.id">{{menu.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {State, Mutation} from 'vuex-class'

  @Component
  export default class NavView extends Vue {
    @State((state: State) => state.common.menuExpand) private menuExpand: string
    @State((state: State) => state.common.menuTabs) private menuTabs: any[]
    @State((state: State) => state.common.selectedTab) private selectedTab: any
    @Mutation('toggleMenu') private toggleMenuMutation: () => void

    private toggleMenu() {
      this.toggleMenuMutation()
    }

    get nav() {
      const item: any = this.menuTabs.find((item: any) => item.key === this.selectedTab)
      if (item) {
        return item.menus
      }
      return [{name: '首页'}]
    }
  }

</script>

<style lang="scss" scoped>
</style>