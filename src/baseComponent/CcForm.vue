<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <el-form ref="form" :model="data.model" :label-width="data.labelWidth || '100px'" v-bind="formProps">
    <el-form-item v-bind="itemProps(item)" v-for="(item, index) in data.items" :key="item.id || index">
      <!--选择框-->
      <el-select v-model="data.model[item.field]" v-bind="item.props" v-if="item.type === 'select'">
        <el-option :label="option.label" :value="option.value" :key="option.value" v-for="option in item.options"></el-option>
      </el-select>
      <!--日期选择-->
      <el-date-picker v-model="data.model[item.field]" v-bind="item.props" :type="item.type" class="date-time"
                      v-else-if="['date', 'datetime', 'daterange', 'datetimerange'].includes(item.type)"></el-date-picker>
      <!--开关-->
      <el-switch v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'switch'"></el-switch>
      <!--input-->
      <el-input v-model="data.model[item.field]" v-bind="item.props" :type="item.type" v-else></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue, Prop} from 'vue-property-decorator'

  @Component
  export default class CcForm extends Vue {
    /*vue-props*/
    @Prop({required: true, type: Object}) private data: any
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    get formProps() {
      const {items, ...props} = this.data
      return props
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    // 过滤掉不要的属性，给表单item绑定
    private itemProps(item: any) {
      const {options, props, ...itemProps} = item
      return itemProps
    }
  }
</script>

<style lang="scss" scoped>
</style>