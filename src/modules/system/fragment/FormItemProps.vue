<!--Created by 熊超超 on 2018/6/12.-->
<template>
  <cc-form :data="formObj" class="table" v-if="item"/>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class FormItemProps extends Vue {
    /*vue-props*/
    @Prop() private item: any
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get formObj() {
      const model = this.item || {}
      const items: any[] = [
        {label: '标签', prop: 'label', type: 'text'},
        {label: '字段名', prop: 'prop', type: 'text'},
        {label: '字段类型', prop: 'type', type: 'select', options: [
            {label: '文本框', value: 'text'},
            {label: '密码框', value: 'password'},
            {label: '多行文本框', value: 'textarea'},
          ]},
        {label: '占位符', prop: 'placeholder', type: 'text', placeholder: '值为空的提示信息'},
        {label: '更多选项', prop: 'propsStr', type: 'textarea', placeholder: '对应element-ui的属性,接收json格式的字符串,属性名必须用双引号'},
      ]
      if (this.item.type !== 'text') {
        items.splice(2, 1)
      }
      return {model, items, btns: []}
    }
    /*vue-watch*/
    @Watch('item.propsStr')
    private propsStrChange(val: string) {
      try {
        const json = JSON.parse(val)
        this.item.props = this.item.props || {}
        this.item.props = {...this.item.props, ...json}
      } catch (e) {
        console.log(e.message)
      }
    }
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .table /deep/ {
    border-top: 1px solid $border-color;
    border-left: 1px solid $border-color;
    .el-form-item{
      flex: 0 0 100%;
      margin-bottom: 0;
      border-bottom: 1px solid $border-color;
    }
    .el-form-item__content{
      border-left: 1px solid $border-color;
      border-right: 1px solid $border-color;
    }
    input, textarea {
      border: 0;
    }
  }
</style>