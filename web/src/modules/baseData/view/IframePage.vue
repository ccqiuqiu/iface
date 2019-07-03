<!--Created by 熊超超 on 2019-06-12.-->
<template>
  <div v-loading="loading" class="h-100">
    <iframe @load="loading = false" :src="decodeURIComponent(query.url)" frameborder="0"></iframe>
  </div>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator'
import { TabMixin } from '../../../assets/utils/mixins'

export default @Component class IframePage extends Mixins(TabMixin) {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  loading = true
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
