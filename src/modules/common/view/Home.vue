<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div>
    <cc-icon name="component" @click="$utils.toTab('/system/user')"></cc-icon>
    <span>home</span>
  </div>
</template>

<script lang="tsx">
  import {Component, Vue} from 'vue-property-decorator'

  @Component
  export default class Home extends Vue {
  }
</script>

<style lang="scss" scoped>
</style>
