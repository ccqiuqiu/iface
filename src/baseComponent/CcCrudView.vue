<!--Created by 熊超超 on 2018/6/8.-->
<template>
  <div v-loading="loading" class="crud-view">
    <div v-for="(field, index) in fields" :key="index" flex="cross:center" class="item">
      <div class="label">{{field.label}}</div>
      <div class="value">{{mData[field.prop]}}</div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import {Action} from 'vuex-class'

@Component
export default class CcCrudView extends Vue {
  /* vue-props */
  @Prop() data
  @Prop() fields
  @Prop() url
  /* vue-vuex */
  @Action('requestUrl') requestUrl
  /* vue-data */
  mData = this.data
  loading = false
  /* vue-compute */
  /* vue-watch */
  @Watch('url', {immediate: true})
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
    const {data} = await this.requestUrl(this.url)
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
