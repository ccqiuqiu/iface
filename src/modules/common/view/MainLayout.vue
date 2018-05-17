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
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import HeaderView from '../../common/view/HeaderView.vue'
  import MenuView from '../../common/view/MenuView.vue'
  import NavView from '../../common/view/NavView.vue'
  import TabsView from '../../common/view/TabsView.vue'

  @Component({
    components: {HeaderView, MenuView, NavView, TabsView},
  })
  export default class MainLayout extends Vue {
  }
</script>
<style lang="less">
</style>

