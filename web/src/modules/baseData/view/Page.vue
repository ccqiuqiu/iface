<!--Created by 熊超超 on 2018/6/5.-->
<template>
  <div>
    <!--<cc-crud :data="data" v-if="data && page.type === $c.PageTypeV.表格页面" :page="page"></cc-crud>-->
    <!--<cc-crud-tree :data="data" v-if="data && page.type === $c.PageTypeV.树页面" :page="page"></cc-crud-tree>-->
    <!--<cc-render-vue :code="code" v-if="code" id="render-page"></cc-render-vue>-->
      <component v-bind:is="component" v-if="component"></component>
  </div>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { initOptions } from '../../../assets/utils/crudUtils.jsx'
import { BaseMixin, TabMixin } from '../../../assets/utils/mixins'
import CcRenderVue from '../../../baseComponent/CcRenderVue.vue'

export default @Component({ components: { CcRenderVue } }) class Page extends Mixins(BaseMixin, TabMixin) {
  /* vue-props */
  /* vue-vuex */
  @Getter flatMenu
  @Action('getPage') getPage
  /* vue-data */
  component = null
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.getData()
  }
  /* vue-method */
  async getData () {
    this.loading = true
    console.log(this.params)
    let { data } = await this.getPage(this.params['p1'])
    if (data) {
      let { value, ...page } = data
      if (data.type === this.$c.PageTypeV.代码) {
        data = value
      } else {
        const crud = JSON.parse(value)
        await initOptions(crud)
        data = crud
      }
      data = typeof data === 'string' ? data : JSON.parse(JSON.stringify(data))
      page = JSON.parse(JSON.stringify(page))
      this.component = {
        name: 'page-' + page.code,
        data () {
          return { data, page }
        },
        render: h => {
          if (page.type === this.$c.PageTypeV.表格页面) {
            return <cc-crud data={data} page={page}></cc-crud>
          } else if (page.type === this.$c.PageTypeV.树页面) {
            return <cc-crud-tree data={data} page={page}></cc-crud-tree>
          } else if (page.type === this.$c.PageTypeV.代码) {
            return <CcRenderVue code={data} id="render-page"></CcRenderVue>
          }
        }
      }
    }
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
</style>
