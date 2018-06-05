<!--Created by 熊超超 on 2018/6/5.-->
<template>
  <cc-crud :data="data" v-if="!$utils.isEmptyObject(data)"></cc-crud>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {Action} from 'vuex-class'

  @Component
  export default class CrudDemo extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action('getCrud') private getCrud: (id: number) => Promise<ActionReturn>
    /*vue-data*/
    private data?: CURDObject = {}
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    private async created() {
      const {data} = await this.getCrud(0)
      if (data) {
        this.data = data
      }
    }
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>