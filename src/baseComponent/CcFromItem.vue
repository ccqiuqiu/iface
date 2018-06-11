<!--Created by 熊超超 on 2018/6/11.-->
<template>
  <el-form-item v-bind="itemProps(item)" :class="{'is-required': item.verify && item.verify.canBeEmpty === undefined}">
    <!--选择框-->
    <el-select v-model="model[item.prop]" v-bind="item.props" v-if="item.type === 'select'">
      <el-option :label="option.label" :value="option.value" :key="option.value" v-for="option in item.options"/>
    </el-select>
    <!--日期，范围-->
    <el-date-picker v-model="model[item.prop]" v-bind="item.props" :type="item.type"
                    v-else-if="['date', 'datetime', 'daterange', 'datetimerange'].includes(item.type)"
                    :value-format="datePickerFarmatter(item)"></el-date-picker>
    <!--时间选择-->
    <el-time-select v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type=== 'timeselect'">
    </el-time-select>
    <!--时间、范围-->
    <el-time-picker v-model="model[item.prop]" v-bind="item.props" :is-range="item.type === 'timerange'"
                    v-else-if="['time', 'timerange'].includes(item.type)"
                    :value-format="item.props && item.props.valueFormat ? item.props.valueFormat : 'HH:mm:ss'">
    </el-time-picker>
    <!--开关-->
    <el-switch v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type === 'switch'"></el-switch>
    <!--单选-->
    <el-radio-group v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type === 'radio'">
      <el-radio v-bind="option" :label="option.value" :name="item.prop" :key="option.value" v-for="option in item.options">{{option.label}}</el-radio>
    </el-radio-group>
    <!--单选-按钮-->
    <el-radio-group v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type === 'radiobutton'">
      <el-radio-button v-bind="option" :label="option.value" :name="item.prop" :key="option.value" v-for="option in item.options">{{option.label}}</el-radio-button>
    </el-radio-group>
    <!--多选-->
    <cc-checkbox-group v-model="model[item.prop]" v-bind="item.props" :options="item.options" :type="item.type"
                       v-else-if="['checkbox', 'checkboxbutton'].includes(item.type)"></cc-checkbox-group>
    <!--级联选择器-->
    <el-cascader v-model="model[item.prop]" :options="item.options" v-bind="item.props" v-else-if="item.type === 'cascader'"/>
    <!--计数器-->
    <el-input-number v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type === 'number'"></el-input-number>
    <!--滑块-->
    <el-slider v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type === 'slider'"></el-slider>
    <!--评分-->
    <el-rate v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type === 'rate'"></el-rate>
    <!--popover-table-->
    <cc-input-table v-model="model[item.prop]" v-bind="item.props" :options="item.options" v-else-if="item.type === 'table'"></cc-input-table>
    <!--popover-tree-->
    <cc-input-tree v-model="model[item.prop]" v-bind="item.props" :options="item.options" v-else-if="item.type === 'tree'"></cc-input-tree>
    <!--弹出dialog-->
    <cc-input-dialog @input="onValueChange(item.prop)" :title="item.label" v-model="model[item.prop]" v-bind="item.props" :dialog="item.dialog" v-else-if="item.type === 'dialog'"></cc-input-dialog>
    <!--icon-->
    <cc-input-icon v-model="model[item.prop]" v-bind="item.props" v-else-if="item.type === 'icon'"></cc-input-icon>
    <!--input-->
    <template v-else>
      <el-input v-model.number="model[item.prop]" v-bind="item.props" :type="item.type" v-if="isNumber(item.verify)" clearable></el-input>
      <el-input v-model="model[item.prop]" v-bind="item.props" :type="item.type" v-else clearable></el-input>
    </template>
  </el-form-item>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import CcInputTable from './CcInputTable.vue'
  import CcInputTree from './CcInputTree.vue'
  import CcInputDialog from './CcInputDialog.vue'
  import CcInputIcon from './CcInputIcon.vue'
  import CcCheckboxGroup from './CcCheckboxGroup.vue'

  @Component({components: {CcInputTable, CcInputTree, CcInputDialog, CcInputIcon, CcCheckboxGroup}})
  export default class CcFromItem extends Vue {
    /*vue-props*/
    @Prop({required: true, type: Object}) private model: any
    @Prop({required: true}) private item: FormItem
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    // 过滤form-item的props
    private itemProps(item: FormItem) {
      const {options, props, dialog, verify, ...itemProps} = item
      if (verify && !verify.verify) {
        verify.verify = ''
      }
      return {...itemProps, ...verify}
    }
    // 日期控件默认格式
    private datePickerFarmatter(item: FormItem) {
      if (item.props && item.props.valueFormat) {
        return item.props.valueFormat
      } else {
        return (item.type === 'date' || item.type === 'daterange') ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'
      }
    }
    // 检查输入框的值是否是number，以判断是否要加number修饰符
    private isNumber(verify: any) {
      return verify && (verify.number || verify.int || verify.maxDecimalLength || verify.gt || verify.gte || verify.lt || verify.lte)
    }
  }
</script>

<style lang="scss" scoped>
</style>