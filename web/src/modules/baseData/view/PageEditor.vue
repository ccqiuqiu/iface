<!--Created by 熊超超 on 2018/8/7.-->
<template>
  <div flex="dir:top">
    <el-card shadow="never" class="p flex" flex-box="1">
      <div slot="header" flex="cross:center">
        <span flex-box="1">{{pageTitle}}</span>
      </div>
      <codemirror v-model="code" :options="options" flex-box="1" class="b-t b-l b-r"></codemirror>
      <div class="p-10 b-t">
        <cc-form :data="formObj" full-width/>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {BaseMixin} from '../../../assets/utils/mixins'
  import { codemirror } from 'vue-codemirror-lite'
  // language
  import 'codemirror/mode/vue/vue.js'
  import {FormItemTypeEnum} from '../../../assets/utils/enums'
  import {Action} from 'vuex-class'

  @Component({mixins: [BaseMixin], components: {codemirror}})
  export default class PageEditor extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action public getPage: (code: string) => Promise<ActionReturn>
    @Action public savePage: (page: Page) => Promise<ActionReturn>
    /*vue-data*/
    public formObj = {
      model: {},
      items: [
        {label: `页面名称`, prop: 'pageName', type: FormItemTypeEnum.text, placeholder: '页面名称', verify: {required: true}},
        {label: `页面代码`, prop: 'pageCode', type: FormItemTypeEnum.text, placeholder: '唯一编码', verify: {required: true}},
        {label: `页面描述`, prop: 'pageDesc', type: FormItemTypeEnum.textarea, placeholder: ''},
      ],
      btns: [
        {action: 'save', cb: this.save},
      ],
    }
    public options: any = {
      tabSize: 2,
      lineNumbers: true,
      mode: 'text/x-vue',
    }
    public code: string = ``
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    public created() {
      this.initData()
    }
    /*vue-method*/
    public async initData() {
      if (this.$route.query['code']) {
        const {data} = await this.getPage(this.$route.query['code'])
        if (data) {
          const {value, ...model} = data
          this.code = value
          this.formObj.model = model
        }
      } else {
        this.code = decodeURIComponent(`%3Ctemplate%3E%0A%0A%3C%2Ftemplate%3E%0A%0A%3Cscript%3E%0A%20%20export%20default%20%7B%0A%20%20%20%20%0A%20%20%7D%0A%3C%2Fscript%3E%0A%0A%3Cstyle%3E%0A%20%20%0A%3C%2Fstyle%3E`)
      }
    }
    public async save() {
      const page: Page = this.formObj.model as Page
      if (!page.id) {
        page.type = this.$c.PageTypeV.页面
        page.category = this.$c.PageCategoryV.CODE
      }
      page.value = this.code
      const {error} = await this.savePage(page)
      if (!error) {
        this.$utils.message('保存成功！')
        this.$utils.closeTab('/baseData/pageList')
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .vue-codemirror-wrap{
    overflow: auto;
  }
  /deep/ .CodeMirror{
    height: 1000px;
  }
</style>