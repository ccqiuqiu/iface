<!--Created by 熊超超 on 2018/6/12.-->
<template>
  <cc-form :data="formObj" class="table" v-if="item"/>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class FormItemProps extends Vue {
    /*vue-props*/
    @Prop() private item: any
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get formObj() {
      const model = this.item || {}
      const items = [
        {label: '标签', prop: 'label', type: 'text'},
        {label: '字段名', prop: 'prop', type: 'text'},
        {label: '字段类型', prop: 'type', type: 'select', options: [
            {label: '文本框', value: 'text'},
            {label: '密码框', value: 'password'},
            {label: '多行文本框', value: 'textarea'},
          ]},
        {label: '更多选项', prop: 'props', type: 'textarea'},
      ]
      return {model, items, btns: []}
    }
    /*vue-watch*/
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