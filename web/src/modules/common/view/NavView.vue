<!--Created by 熊超超 on 2018/4/25.-->
<template>
  <div data-flex="cross:center box:justify" class="nav p-h-10" :style="bg">
    <cc-icon name="menu" :rotate="menuExpand? 0 : 90" @click="toggleMenu" class="cp"/>
    <el-breadcrumb separator="/" class="m-l-10">
      <el-breadcrumb-item v-for="menu in nav" :key="menu.id">{{menu.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div data-flex="cross:center">
      <cc-icon name="user" size="18" class="m-r-5"/>
      <span>{{user.name}}</span>
      <span class="m-h-5">|</span>
      <span>{{user.roleString}}</span>
      <cc-icon name="logout" size="18" class="m-l-16 cp" @click="onLogout"/>
      <cc-theme-picker class="m-l-10"></cc-theme-picker>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { State, Mutation, Getter } from 'vuex-class'
import CcThemePicker from '../../../baseComponent/CcThemePicker'

export default @Component({components: {CcThemePicker}}) class NavView extends Vue {
  /* vue-props */
  /* vue-vuex */
  @State((state) => state.common.menuExpand) menuExpand
  @State((state) => state.common.menuTabs) menuTabs
  @State((state) => state.common.selectedTab) selectedTab
  @State((state) => state.common.user) user
  @State((state) => state.pColor) pColor
  @Getter nav
  @Mutation toggleMenu
  /* vue-data */
  /* vue-compute */
  get bg () {
    return {
      'background-color': this.pColor
    }
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  // 退出登录
  async onLogout () {
    // this.$ls.remove('token')
    sessionStorage.removeItem('token')
    this.$utils.message('退出登录成功')
    // 清除store里面缓存的数据
    this.$store.commit('clearStore')
    if (this.$env.ssoUrl) {
      window.location.href = this.$env.ssoUrl + '/logout?service=' + location.origin
    } else {
      // clearStore里面会改动selected,将导致url跳转到一次'/'
      // 所以在下一个$nextTick跳转，保证会跳转到登录页
      this.$nextTick(() => this.$router.push('/login'))
    }
  }
}

</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .nav{
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
