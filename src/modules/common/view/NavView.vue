<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <div flex="cross:center box:justify" class="nav p-h-10">
    <cc-icon name="menu" :rotate="menuExpand? 0 : 90" @click="toggleMenu" class="cp"/>
    <el-breadcrumb separator="/" class="m-l-10">
      <el-breadcrumb-item v-for="menu in nav" :key="menu.id">{{menu.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div flex="cross:center">
      <cc-icon name="user" size="18" class="m-r-5"/>
      <span>{{user.userName}}</span>
      <span class="m-h-5">|</span>
      <span>{{user.roles}}</span>
      <cc-icon name="logout" size="18" class="m-l-16 cp" @click="logout"/>
    </div>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import {State, Mutation, Getter} from 'vuex-class'

@Component
export default class NavView extends Vue {
  /* vue-props */
  /* vue-vuex */
  @State((state) => state.common.menuExpand) menuExpand
  @State((state) => state.common.menuTabs) menuTabs
  @State((state) => state.common.selectedTab) selectedTab
  @State((state) => state.common.user) user
  @Getter nav
  @Mutation toggleMenu
  @Mutation('clearStore') clearStore
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  // 退出登录
  logout () {
    this.$utils.remove('token')
    // 清除store里面缓存的数据
    this.clearStore()
    this.$router.push('/login')
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .nav{
    background-color: $color-primary;
    height: 50px;
    color: $color-white;

    /deep/ .el-breadcrumb{
      font-size: 12px;
      .el-breadcrumb__inner{
        color: $color-white;
      }
      .el-breadcrumb__item:last-child .el-breadcrumb__inner{
        color: rgba($color-white, 0.6);
      }
    }
  }
</style>
