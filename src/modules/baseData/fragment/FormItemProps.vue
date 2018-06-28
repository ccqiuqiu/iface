<!--Created by 熊超超 on 2018/6/12.-->
<template>
  <cc-form @keyup="onChange" @change="onChange" :data="formObj" class="table" v-if="item"/>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import CrudUtils from '@utils/crudUtils.tsx'

  @Component
  export default class FormItemProps extends Vue {
    /*vue-props*/
    @Prop() private item: any
    @Prop(Boolean) private needOptions: boolean
    @Prop(Number) private type: number
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get formats() {
      return Object.keys(CrudUtils).map((key: string) => ({label: CrudUtils[key].label, value: key}))
    }
    get formObj() {
      const model = this.item || {}
      const items: any = [
        {label: '标签', prop: 'label', type: 'text', placeholder: '表单的标签'},
        {label: '字段名', prop: 'prop', type: 'text', placeholder: '绑定的字段'},
        {label: '占位符', prop: 'placeholder', type: 'text', placeholder: '值为空的提示信息'},
        {label: '更多选项', prop: 'propsStr', type: 'textarea', props: {autosize: {minRows: 3, maxRows: 6}}, placeholder: '对应element-ui的属性,接收json格式的字符串,属性名必须用双引号'},
      ]
      if (this.needOptions) {
        items.splice(items.length - 1, 0, ...[
          {label: '显示字段', prop: 'labelField', type: 'text', placeholder: '显示用字段，默认为label'},
          {label: '值字段', prop: 'valueField', type: 'text', placeholder: '保存值的字段, 默认为value'},
        ])
      }
      if (['text', 'password', 'textarea'].includes(this.item.type)) {
        items.splice(items.length - 1, 0, {label: '字段类型',
          prop: 'type',
          type: 'select',
          options: [
            {label: '文本框', value: 'text'},
            {label: '密码框', value: 'password'},
            {label: '多行文本框', value: 'textarea'},
          ],
        })
      }
      if (this.type === this.$c.PageTypeV.页面) {
        items.push({
          label: '用于', prop: 'target', type: 'checkbox',
          options: [
            {label: '搜索', value: 'searchForm'},
            {label: '编辑', value: 'editForm'},
            {label: '表格', value: 'table'},
          ],
        })
        if (model.target && model.target.includes('table')) {
          items.push(...[
            {label: '列宽度', prop: 'width', type: 'text', placeholder: '列宽度'},
            {label: '列格式化', prop: 'formatFun', type: 'select', options: this.formats},
          ])
        }
      }
      return {model, items, btns: []}
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    private onChange(prop: string) {
      const value = (this.formObj.model[prop] || '').trim()
      this.item.props = this.item.props || {}
      if (prop === 'propsStr') {
        try {
          const json = JSON.parse(value)
          this.item.props = {...this.item.props, ...json}
        } catch (e) {
          this.item.props = {}
        }
      } else if (prop === 'labelField') {
        this.item.props = {...this.item.props, labelField: value}
      } else if (prop === 'valueField') {
        this.item.props = {...this.item.props, valueField: value}
      }
      this.$emit('change')
    }
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
    .el-checkbox-group{
      padding-left: 15px;
      padding-right: 8px;
      .el-checkbox{
        margin-right: 8px;
        .el-checkbox__label{
          font-weight: normal;
          font-size: 12px;
          padding-left: 5px;
        }
      }
    }
    input, textarea {
      border: 0;
    }
  }
</style>