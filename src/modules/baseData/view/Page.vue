<!--Created by 熊超超 on 2018/6/5.-->
<template>
  <div v-loading="loading">
    <cc-crud :data="data" v-if="data"></cc-crud>
    <cc-render-vue :code="code" v-else></cc-render-vue>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import {initOptions} from '@utils/crudUtils.tsx'
  import {BaseMixin} from '@utils/mixins'
  import CcRenderVue from '@bc/CcRenderVue.vue'

  @Component({mixins: [BaseMixin], components: {CcRenderVue}})
  export default class Page extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action('getPage') public getPage: (code: string) => Promise<ActionReturn>
    /*vue-data*/
    public data: CRUDObject | null = null
    public code: string = ''
    /*vue-compute*/
    /*vue-watch*/
    @Watch('$route', {immediate: true})
    public routerChange() {
      this.getData()
    }
    /*vue-lifecycle*/
    public async getData() {
      this.loading = true
      const code = this.$route.params['code']
      let {data} = await this.getPage(code)
      if (data) {
        if (data.category === this.$c.PageCategoryV.CODE) {
          this.code = data.value
        } else {
          if (data.value) {
            data = JSON.parse(data.value)
          }
          await initOptions(data)
          this.data = data
        }
      }
      this.loading = false
    }
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>