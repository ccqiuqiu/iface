<!--Created by 熊超超 on 2018/8/7.-->
<template>
  <div :class="id + ' root'"><component :is="component"></component></div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  @Component
  export default class CcRendeVue extends Vue {
    /*vue-props*/
    @Prop(String) public code: string
    @Prop(String) public id: string  // id是为了给增加的style做一个标识，防止重复添加
    /*vue-vuex*/
    /*vue-data*/
    public template: string = ''
    public script: any = {}
    /*vue-compute*/
    get component() {
      return {...this.script, template: this.template}
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    public created() {
      // 获取template
      let exp = new RegExp('[^]*<template>([^]*)<\/template>[^]*')
      exp.test(this.code)
      this.template = RegExp.$1
      // 获取script
      exp = new RegExp('[^]*<script>\s*[^\{]*([^]*)<\/script>[^]*')
      exp.test(this.code)
      this.script = new Function('return ' + RegExp.$1)()
      // 获取style
      exp = new RegExp('[^]*<style.*>([^]*)</style>[^]*')
      exp.test(this.code)
      this.appendCss(RegExp.$1)
    }
    /*vue-method*/
    // 添加样式到head
    public appendCss(code: string) {
      if (!document.querySelector('#' + this.id)) {
        code = code.replace(/([\.#\w].*\{)/g, `.${this.id} $1`)
        const style: HTMLStyleElement = document.createElement('style')
        style.type = 'text/css'
        style.id = this.id
        style.appendChild(document.createTextNode(code))
        const head = document.getElementsByTagName('head')[0]
        head.appendChild(style)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .root{
    height: calc(100% - 10px);
  }
</style>