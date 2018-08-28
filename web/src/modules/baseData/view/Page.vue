<!--Created by 熊超超 on 2018/6/5.-->
<template>
  <div v-loading="loading">
    <!--<cc-crud :data="data" v-if="data && page.type === $c.PageTypeV.表格页面" :page="page"></cc-crud>-->
    <!--<cc-crud-tree :data="data" v-if="data && page.type === $c.PageTypeV.树页面" :page="page"></cc-crud-tree>-->
    <!--<cc-render-vue :code="code" v-if="code" id="render-page"></cc-render-vue>-->
    <keep-alive>
      <component v-bind:is="component" v-if="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import { Component, Watch, Mixins } from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'
import {initOptions} from '../../../assets/utils/crudUtils.jsx'
import {BaseMixin, TabMixin} from '../../../assets/utils/mixins'
import CcRenderVue from '../../../baseComponent/CcRenderVue.vue'

const cacheComponents = {}

@Component({components: {CcRenderVue}})
export default class Page extends Mixins(BaseMixin, TabMixin) {
  /* vue-props */
  /* vue-vuex */
  @Getter flatMenu
  @Action('getPage') getPage
  /* vue-data */
  data = null
  page = null
  /* vue-compute */
  get component () {
    if (!this.data || this.$route.name !== 'page') {
      return null
    }
    const key = 'page' + this.$route.path.replace(/\//g, '-')
    if (cacheComponents[key]) {
      return cacheComponents[key]
    } else {
      const data = typeof this.data === 'string' ? this.data : JSON.parse(JSON.stringify(this.data))
      const page = JSON.parse(JSON.stringify(this.page))
      const com = {
        name: key,
        data () {
          return {data, page}
        },
        render: h => {
          if (page.type === this.$c.PageTypeV.表格页面) {
            return <cc-crud data={data} page={page}></cc-crud>
          } else if (page.type === this.$c.PageTypeV.树页面) {
            return <cc-crud-tree data={data} page={page}></cc-crud-tree>
          } else if (page.type === this.$c.PageTypeV.CODE) {
            return <CcRenderVue code={data} id="render-page"></CcRenderVue>
          }
        }
      }
      cacheComponents[key] = com
      return com
    }
  }
  /* vue-watch */
  @Watch('$route', {immediate: true})
  routerChange (val) {
    if (val.name === 'page') {
      this.data = null
      this.getData()
    }
  }
  /* vue-lifecycle */
  /* vue-method */
  async getData () {
    this.loading = true
    const code = this.$route.params['code']
    const {data} = await this.getPage(code)
    if (data) {
      const {value, ...page} = data
      this.page = page
      if (data.type === this.$c.PageTypeV.CODE) {
        this.data = value
      } else {
        const crud = JSON.parse(value)
        await initOptions(crud)
        this.data = crud
      }
    }
    this.loading = false
  }
  destroy (id) {
    const menu = this.flatMenu.find(m => m.id === id)
    if (menu && menu.url.indexOf('/baseData/page/') === 0) {
      const key = 'page' + menu.url.replace(/\//g, '-')
      const component = this.$children.find(c => c.$vnode.tag.indexOf(key) >= 0)
      if (component) {
        this.$utils.destroyAndRemoveCache(component)
        delete cacheComponents[key]
      }
    }
    if (this.$utils.isEmptyObject(cacheComponents)) {
      this.$utils.destroyAndRemoveCache(this)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
