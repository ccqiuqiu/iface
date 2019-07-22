<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div class="left" data-flex="dir:top" tabindex="1">
    <div class="logo" data-flex-box="0" data-flex="cross:center main:center" :style="logoBg">
      <span v-if="menuExpand" class="f-24">iFace-Admin</span>
      <span v-else class="f-18">iFace</span>
    </div>
    <el-menu ref="menu" :default-active="activeMenu"
         :collapse="!menuExpand" :background-color="menuBg"
         @select="selectMenu" data-flex-box="1">
      <el-menu-item :index="'0'" key="0" v-show="false">
        <!--这个隐藏的菜单为了解决首页的时候，高亮的菜单项不正确-->
      </el-menu-item>
      <template v-for="menu in menus">
        <my-menu :menu="menu" :key="menu.id"></my-menu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import MyMenu from '../fragment/MyMenu'

export default @Component({components: {MyMenu}}) class MenuView extends Vue {
  /* vue-props */
  /* vue-vuex */
  @State((state) => state.common.menus) menus
  @State((state) => state.common.menuExpand) menuExpand
  @State((state) => state.pColor) pColor
  @Getter activeMenu
  @Getter flatMenu
  @Action getMenu
  /* vue-data */
  /* vue-compute */
  get logoBg () {
    return {
      backgroundColor: this.$utils.shadeColor(this.pColor, 0.3)
    }
  }
  get menuBg () {
    return this.$utils.shadeColor(this.pColor, 0.7)
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  // 菜单选择的回调
  selectMenu (index) {
    const menu = this.flatMenu.find((m) => m.id === index)
    if (menu.openType === this.$c.MenuOpenTypeV.内部) {
      this.$tab.open(menu.url)
    } else if (menu.openType === this.$c.MenuOpenTypeV.Iframe) {
      this.$tab.open('/baseData/iframe?url=' + encodeURIComponent(menu.url), menu.name)
    } else if (menu.openType === this.$c.MenuOpenTypeV.新窗口) {
      // 不用window.open 是因为可能被拦截
      this.$utils.toLink(menu.url, null, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars.scss";
  .left{
    .logo{
      height: 50px;
      color: $color-white;
    }
  }
  .left:focus{
    outline: 0;
  }
  .left /deep/ {
    .el-menu:not(.el-menu--collapse) {
      width: 200px;
    }
    .el-menu{
      border-right: 0;

      .svg-icon {
        margin-bottom: -2px;
      }
    }
    .el-submenu__title, .el-menu-item{
      color: rgba($color-white, 0.6);
    }
    .el-submenu__title:hover, .el-menu-item:hover, .el-menu-item:focus{
      color: $color-white;
    }

    .el-menu--inline{
      .svg-icon {
        margin-bottom: -1px;
      }
      .el-submenu__title, .el-menu-item{
        color: rgba($color-white, 0.4);
      }
      .el-submenu__title:hover, .el-menu-item:hover, .el-menu-item:focus{
        background-color: inherit;
        color: $color-white;
      }

      .is-active{
        color: $color-white;
      }
    }

    .el-menu-item{
      height: 44px;
      line-height: 44px;
    }
    .el-submenu .el-menu-item{
      height: 36px;
      line-height: 36px;
    }
  }
</style>
