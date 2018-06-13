<!--Created by 熊超超 on 2018/6/13.-->
<template>
  <div v-if="item && ['select', 'checkbox', 'radio', 'checkboxbutton', 'radiobutton', 'cascader', 'table', 'tree', 'dialog'].includes(item.type)">
    <el-radio-group v-model="source" class="m-v-10">
      <el-radio :label="1">使用固定值</el-radio>
      <el-radio :label="2">使用数据源</el-radio>
    </el-radio-group>
    <el-input v-model="source1" v-if="source === 1" type="textarea" :autosize="{ minRows: 4}" placeholder="输入json格式的数据"></el-input>
    <el-input v-model="source2" v-else placeholder="输入数据源代码"></el-input>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class FormItemOptions extends Vue {
    /*vue-props*/
    @Prop() private item: any
    /*vue-vuex*/
    /*vue-data*/
    private source: number = 0
    private source1: string = ''
    private source2: string = ''
    /*vue-compute*/
    /*vue-watch*/
    @Watch('item')
    private itemChange(val: any) {
      if (val && val.options) {
        if (typeof val.options === 'string') {
          this.source = 2
          this.source2 = val.options
        } else {
          this.source = 1
          this.source1 = JSON.stringify(val.options)
        }
      }
    }
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>