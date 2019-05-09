<!--Created by 熊超超 on 2018/6/8.-->
<template>
  <div v-loading="loading" class="crud-view">
    <div v-for="(item, index) in items" :key="index" data-flex="cross:center" class="item">
      <div class="label">{{item.label}}</div>
      <div class="value">{{item.value}}</div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'

export default @Component class CcCrudView extends Vue {
  /* vue-props */
  @Prop() data
  @Prop(Array) fields
  @Prop(String) url
  /* vue-vuex */
  @Action requestUrl
  /* vue-data */
  data () {
    return {
      mData: this.data
    }
  }
  loading = false
  /* vue-compute */
  get items () {
    return this.fields.filter((field) => this.mData[field.prop]).map((field) => {
      const item = { label: field.label, value: this.mData[field.prop] }
      if (field.formProps && field.formProps.options) {
        let rows = field.formProps.options
        let labelField = 'label'
        let valueField = 'value'
        if (['table', 'tree'].includes(field.formProps.type)) {
          labelField = field.formProps.props ? (field.formProps.props.labelField || 'name') : 'name'
          valueField = field.formProps.props ? (field.formProps.props.valueField || 'id') : 'id'
        }
        item.value = Array.isArray(item.value) ? item.value : [item.value]
        if (field.formProps.type === 'table') {
          rows = field.formProps.options.rows
        } else if (field.formProps.type === 'tree') {
          rows = this.$utils.flatObject(field.formProps.options)
        }
        item.value = rows
          .filter((row) => item.value.includes(row[valueField]))
          .map((row) => row[labelField] || row.id).join(',')
      }
      // if (field.tableProps.formatFun) {
      //   const key = field.formatFun.replace('Render', 'Format')
      //   if (CrudUtils[key]) {
      //     item.value = CrudUtils[key].format(null, null, item.value)
      //   }
      // }
      return item
    })
  }
  /* vue-watch */
  @Watch('url', { immediate: true })
  urlChange (val) {
    if (val) {
      this.initModel()
    }
  }
  @Watch('data')
  dataChange (val) {
    this.mData = val
  }
  /* vue-lifecycle */
  /* vue-method */
  // 初始化model。用于更新表单从服务端获取完整数据
  async initModel () {
    this.loading = true
    const { data } = await this.requestUrl({ url: this.url })
    this.loading = false
    if (data) {
      this.mData = data
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/vars";
  .crud-view{
    border: 1px solid $border-color;
    border-bottom: 0;
    .item{
      border-bottom: 1px solid $border-color;
    }
    .label{
      padding: 6px 10px 6px 0;
      background-color: #f7f7f7;
      font-weight: bold;
      width: 100px;
      text-align: right;
      border-right: 1px solid $border-color;
    }
    .value{
      padding-left: 10px;
    }
  }
</style>
