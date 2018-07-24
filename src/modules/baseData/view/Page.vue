<!--Created by 熊超超 on 2018/6/5.-->
<template>
  <cc-crud :data="data" v-if="data"></cc-crud>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import {Action} from 'vuex-class'

  @Component
  export default class CrudDemo extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action('getPage') public getPage: (code: string) => Promise<ActionReturn>
    /*vue-data*/
    public data: CRUDObject | null = null
    /*vue-compute*/
    /*vue-watch*/
    @Watch('$route', {immediate: true})
    public routerChange() {
      this.getData()
    }
    /*vue-lifecycle*/
    public async getData() {
      const code = this.$route.params['code']
      const {data} = await this.getPage(code)
      if (data) {
        if (data.value) {
          this.data = JSON.parse(data.value)
        } else {
          this.data = data
        }
      }
    }
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>