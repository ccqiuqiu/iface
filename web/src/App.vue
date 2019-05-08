<template>
  <div id="app">
    <router-view class="app-view"/>
    <!--接口录制的操作提示-->
    <cc-record></cc-record>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import CcRecord from './record/CcRecord.vue'

export default @Component({ components: { CcRecord } }) class App extends Vue {}
</script>
<style lang="scss">
</style>
