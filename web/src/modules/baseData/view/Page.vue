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
  component = null
  /* vue-compute */
  /* vue-watch */
  @Watch('$route', {immediate: true})
  routerChange (val) {
    if (val.name === 'page') {
      // this.data = null
      this.getData()
    }
  }
  /* vue-lifecycle */
  /* vue-method */
  async getData () {
    const key = 'page' + this.$route.path.replace(/\//g, '-')
    if (!cacheComponents[key]) {
      this.loading = true
      const code = this.$route.params['code']
      let {data} = await this.getPage(code)
      if (data) {
        let {value, ...page} = data
        if (data.type === this.$c.PageTypeV.CODE) {
          data = value
        } else {
          const crud = JSON.parse(value)
          await initOptions(crud)
          data = crud
        }
        // 使用动态组件的方式来显示不同的crud页面，并且通过keep-alive缓存
        // 而组件的数据缓存到cacheComponents防止重新渲染
        data = typeof data === 'string' ? data : JSON.parse(JSON.stringify(data))
        page = JSON.parse(JSON.stringify(page))
        cacheComponents[key] = {
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
      }
      this.loading = false
    }
    this.component = cacheComponents[key]
  }
  // 销毁逻辑，crud的tab被关闭的时候，因为所有crud公用这个组件，所以不能直接销毁该组件
  // 那么根据关闭的tab的id来销毁缓存的子组件，而当缓存的组件全部销毁后，再销毁page组件本身
  destroy (id) {
    const menu = this.flatMenu.find(m => m.id === id)
    if (menu && menu.url.indexOf('/baseData/page/') === 0) {
      const key = 'page' + menu.url.replace(/\//g, '-')
      // 找到缓存的子组件
      const component = this.$children.find(c => c.$vnode.tag.indexOf(key) >= 0)
      if (component) {
        // 销毁组件
        this.$utils.destroyAndRemoveCache(component)
        // 删除缓存的数据
        delete cacheComponents[key]
      }
    }
    // 如果缓存的数据都删完了，那么可以直接销毁page组件了
    if (this.$utils.isEmptyObject(cacheComponents)) {
      this.$utils.destroyAndRemoveCache(this)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
