<!--Created by 熊超超 on 2019-06-12.-->
<template>
  <div>
    <iframe :src="decodeURIComponent($route.query.url)" frameborder="0"></iframe>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component class IframePage extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  iframe{
    width: 100%;
    height: 100%;
  }
</style>
