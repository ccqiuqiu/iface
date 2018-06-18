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
import MenuView from '../../common/view/MenuView.vue'
import NavView from '../../common/view/NavView.vue'
import TabsView from '../../common/view/TabsView.vue'
import CcDialog from '../../../baseComponent/CcDialog.vue'

@Component({
  components: {HeaderView, MenuView, NavView, TabsView, CcDialog}
})
export default class MainLayout extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* 监听路由变化，然后跳转到指定标签，主要解决浏览器后退后的页面和标签不对应的问题 */
  @Watch('$route')
  routerChange (val) {
    this.$utils.toTab(val.path)
  }
  /* vue-lifecycle */
  /* vue-method */
}
</script>
<style lang="scss">
</style>
