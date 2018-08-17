<!--Created by 熊超超 on 2018/6/5.-->
<template>
  <div v-loading="loading">
    <cc-crud :data="data" v-if="data && page.type === $c.PageTypeV.表格页面" :page="page"></cc-crud>
    <cc-crud-tree :data="data" v-if="data && page.type === $c.PageTypeV.树页面" :page="page"></cc-crud-tree>
    <cc-render-vue :code="code" v-if="code" id="render-page"></cc-render-vue>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import {Action} from 'vuex-class'
import {initOptions} from '../../../assets/utils/crudUtils.jsx'
import {BaseMixin} from '../../../assets/utils/mixins'
import CcRenderVue from '../../../baseComponent/CcRenderVue.vue'

@Component({mixins: [BaseMixin], components: {CcRenderVue}})
export default class Page extends Vue {
    /* vue-props */
    /* vue-vuex */
    @Action('getPage') getPage
    /* vue-data */
    data = null
    code = ''
    page = undefined
    /* vue-compute */
    /* vue-watch */
    @Watch('$route', {immediate: true})
    routerChange () {
      this.data = null
      this.code = ''
      this.getData()
    }
    /* vue-lifecycle */
    async getData () {
      this.loading = true
      const code = this.$route.params['code']
      const {data} = await this.getPage(code)
      if (data) {
        if (data.category === this.$c.PageCategoryV.CODE) {
          this.code = data.value
        } else {
          const {value, ...page} = data
          const crud = JSON.parse(value)
          await initOptions(crud)
          this.page = page
          this.data = crud
        }
      }
      this.loading = false
    }
    /* vue-method */
}
</script>

<style lang="scss" scoped>
</style>
