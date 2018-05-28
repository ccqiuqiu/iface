<!--Created by 熊超超 on 2018/4/26.-->
<template>
  <div flex="dir:top">
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

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import HeaderView from '../../common/view/HeaderView.vue'
  import MenuView from '../../common/view/MenuView.vue'
  import NavView from '../../common/view/NavView.vue'
  import TabsView from '../../common/view/TabsView.vue'
  import CcDialog from '../../../baseComponent/CcDialog.vue'
  import {Action} from 'vuex-class'

  @Component({
    components: {HeaderView, MenuView, NavView, TabsView, CcDialog},
  })
  export default class MainLayout extends Vue {
    @Action('getAuth') private getAuth: () => Promise<ActionReturn>

    /* 监听路由变化，然后跳转到指定标签，主要解决浏览器后退后的页面和标签不对应的问题 */
    @Watch('$route')
    private routerChange(val: any) {
      this.$utils.toTab(val.path)
    }

    private created() {
      this.getAuth()
    }
  }
</script>
<style lang="scss">
</style>

