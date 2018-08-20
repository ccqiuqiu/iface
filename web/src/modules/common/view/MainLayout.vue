<!--Created by 熊超超 on 2018/4/26.-->
<template>
  <div flex="dir:top">
    <vue-progress-bar></vue-progress-bar>
    <header-view flex-box="0" v-if="false"/>
    <div flex="box:first" flex-box="1">
      <div flex=""><menu-view/></div>
      <div flex="dir:top">
        <nav-view flex-box="0"></nav-view>
        <tabs-view flex-box="0"></tabs-view>
        <div class="main-view" flex-box="1">
          <router-view class="content-view"/>
        </div>
      </div>
    </div>
    <cc-dialog></cc-dialog>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import HeaderView from '../../common/view/HeaderView.vue'
import MenuView from './MenuView.vue'
import NavView from '../../common/view/NavView.vue'
import TabsView from '../../common/view/TabsView.vue'
import CcDialog from '../../../baseComponent/CcDialog.vue'
import {Action, Mutation} from 'vuex-class'

@Component({
  components: {HeaderView, MenuView, NavView, TabsView, CcDialog}
})
export default class MainLayout extends Vue {
  /* vue-props */
  /* vue-vuex */
  @Mutation('updateUser') updateUser
  @Action getAuth
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* 监听路由变化 */
  @Watch('$route')
  routerChange (val) {
    this.$utils.toTab(val.fullPath)
  }
  /* vue-lifecycle */
  created () {
    this.initAuth()
  }
  /* vue-method */
  async initAuth () {
    // 获取权限
    const {data} = await this.getAuth()
    if (data) {
      this.handlerData(data)
      this.updateUser(data)
    }
  }
  handlerData (data) {
    // 把菜单的id改为字符串
    const menus = data.auth.menus
    if (menus.length) {
      this.number2string(menus)
    }
  }
  number2string (list) {
    list.forEach((item) => {
      item.id = item.id + ''
      // 将补全特殊的url
      if (item.url && item.url.substr(0, 1) !== '/') {
        item.url = '/baseData/page/' + item.url
      }
      if (item.children) {
        this.number2string(item.children)
      }
    })
  }
}
</script>
<style lang="scss">
</style>
