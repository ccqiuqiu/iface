<!--Created by 熊超超 on 2018/6/5.-->
<template>
  <cc-crud :data="data" v-if="data"></cc-crud>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import {Action} from 'vuex-class'

@Component
export default class CrudDemo extends Vue {
  /* vue-props */
  /* vue-vuex */
  @Action('getCrud') getCrud
  /* vue-data */
  data = null
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  async created () {
    const {data} = await this.getCrud(0)
    if (data) {
      this.data = data
    }
  }
  /* vue-method */
}
</script>

<style lang="scss" scoped>
</style>
