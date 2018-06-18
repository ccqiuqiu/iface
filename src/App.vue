<template>
  <div id="app">
    <router-view class="app-view"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
<style lang="scss">
</style>
