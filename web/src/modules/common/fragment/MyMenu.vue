<!--Created by 熊超超 on 2019-06-30.-->
<template>
  <el-submenu :index="menu.id" v-if="menu.children && menu.children.length" :key="menu.id">
    <template slot="title">
      <cc-icon :name="menu.icon || 'ring'" :size="iconSize"></cc-icon>
      <span slot="title" class="m-l-5">{{menu.name}}</span>
    </template>
    <template v-for="subMenu in menu.children.slice(0, 5)">
      <my-menu :menu="subMenu" :key="subMenu.id" :level="level + 1"></my-menu>
    </template>
  </el-submenu>
  <el-menu-item :index="menu.id" v-else :route="{path: menu.url}" :key="menu.id">
    <cc-icon :name="menu.icon || 'ring'" :size="iconSize"></cc-icon>
    <span slot="title" class="m-l-5">{{menu.name}}</span>
  </el-menu-item>
</template>
<script>
import { Component, Vue, Prop } from 'vue-property-decorator'

export default @Component({name: 'my-menu'}) class MyMenu extends Vue {
  @Prop({required: true}) menu
  @Prop({default: 1}) level
  get iconSize () {
    return this.level === 1 ? 18 : 14
  }
}
</script>
