<!--Created by 熊超超 on 2018/8/7.-->
<template>
  <div flex="dir:top">
    <el-card shadow="never" class="p flex" flex-box="1">
      <div slot="header" flex="cross:center">
        <span flex-box="1">{{pageTitle}}</span>
      </div>
      <codemirror v-model="code" :options="options" flex-box="1"></codemirror>
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

  @Component({mixins: [BaseMixin], components: {codemirror}})
  export default class PageEditor extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    public formObj = {
      model: {},
      items: [
        {label: `页面名称`, prop: 'pageName', type: FormItemTypeEnum.text, placeholder: '页面名称', verify: {required: true}},
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
      extraKeys: {Ctrl: 'autocomplete' },
    }
    public code: string = ``
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
  .CodeMirror{
    height: 100%;
  }
</style>