<template>
  <div id="app" flex="dir:top">
    <header-view flex-box="0"/>
    <div flex="box:first" flex-box="1">
      <menu-view/>
      <div flex="dir:top">
        <nav-view flex-box="0"></nav-view>
        <tabs-view flex-box="0"></tabs-view>
        <div class="content-view" flex-box="1">
          <router-view class="main-view"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import HeaderView from './modules/common/view/HeaderView.vue'
  import MenuView from './modules/common/view/MenuView.vue'
  import NavView from './modules/common/view/NavView.vue'
  import TabsView from './modules/common/view/TabsView.vue'

  @Component({
    components: {HeaderView, MenuView, NavView, TabsView},
  })
  export default class App extends Vue {
  }
</script>
<style lang="less">
</style>
