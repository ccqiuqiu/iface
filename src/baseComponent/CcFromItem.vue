<!--Created by 熊超超 on 2018/6/11.-->
<template>
  <el-form-item v-bind="itemProps(mItem)" :class="{'is-required': mItem.verify && mItem.verify.canBeEmpty === undefined}" v-loading="loading">
    <!--选择框-->
    <cc-select v-model="model[mItem.prop]" v-bind="mItem.props" :options="mItem.options" v-if="mItem.type === 'select'" v-on="$listeners"></cc-select>
    <!--日期，范围-->
    <el-date-picker v-model="model[mItem.prop]" v-bind="mItem.props" :type="mItem.type"
                    v-else-if="['date', 'datetime', 'daterange', 'datetimerange'].includes(mItem.type)"
                    :value-format="datePickerFarmatter(mItem)" v-on="$listeners"></el-date-picker>
    <!--时间选择-->
    <el-time-select v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type=== 'timeselect'" v-on="$listeners">
    </el-time-select>
    <!--时间、范围-->
    <el-time-picker v-model="model[mItem.prop]" v-bind="mItem.props" :is-range="mItem.type === 'timerange'"
                    v-else-if="['time', 'timerange'].includes(mItem.type)"
                    :value-format="mItem.props && mItem.props.valueFormat ? mItem.props.valueFormat : 'HH:mm:ss'" v-on="$listeners">
    </el-time-picker>
    <!--开关-->
    <el-switch v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type === 'switch'" v-on="$listeners"></el-switch>
    <!--单选-->
    <el-radio-group v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type === 'radio'" v-on="$listeners">
      <template v-if="mItem.options && typeof mItem.options !== 'string'">
        <el-radio v-bind="option" :label="option.value" :name="mItem.prop" :key="option.value" v-for="option in mItem.options">{{option.label}}</el-radio>
      </template>
    </el-radio-group>
    <!--单选-按钮-->
    <el-radio-group v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type === 'radiobutton'" v-on="$listeners">
      <template v-if="mItem.options && typeof mItem.options !== 'string'">
        <el-radio-button v-bind="option" :label="option.value" :name="mItem.prop" :key="option.value" v-for="option in mItem.options">{{option.label}}</el-radio-button>
      </template>
    </el-radio-group>
    <!--多选-->
    <cc-checkbox-group v-model="model[mItem.prop]" v-bind="mItem.props" :options="mItem.options" :type="mItem.type"
                       v-else-if="['checkbox', 'checkboxbutton'].includes(mItem.type)" v-on="$listeners"></cc-checkbox-group>
    <!--级联选择器-->
    <template v-else-if="mItem.type === 'cascader'">
      <el-cascader v-model="model[mItem.prop]" :options="mItem.options" v-bind="mItem.props" v-if="mItem.options" v-on="$listeners"/>
    </template>
    <!--计数器-->
    <el-input-number v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type === 'number'" v-on="$listeners"></el-input-number>
    <!--滑块-->
    <el-slider v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type === 'slider'" v-on="$listeners"></el-slider>
    <!--评分-->
    <el-rate v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type === 'rate'" v-on="$listeners"></el-rate>
    <!--popover-table-->
    <template v-else-if="mItem.type === 'table'">
      <cc-input-table v-model="model[mItem.prop]" v-bind="mItem.props" :options="mItem.options" v-if="mItem.options" v-on="$listeners"></cc-input-table>
    </template>
    <!--popover-tree-->
    <template v-else-if="mItem.type === 'tree'">
      <cc-input-tree v-model="model[mItem.prop]" v-bind="mItem.props" :options="mItem.options" v-if="mItem.options" v-on="$listeners"></cc-input-tree>
    </template>
    <!--弹出dialog-->
    <cc-input-dialog @input="onValueChange(mItem.prop)" :title="mItem.label" v-model="model[mItem.prop]" v-bind="mItem.props" :dialog="mItem.dialog" v-else-if="mItem.type === 'dialog'"  v-on="$listeners"></cc-input-dialog>
    <!--icon-->
    <cc-input-icon v-model="model[mItem.prop]" v-bind="mItem.props" v-else-if="mItem.type === 'icon'" v-on="$listeners"></cc-input-icon>
    <!--input-->
    <template v-else>
      <el-input v-model.number="model[mItem.prop]" v-bind="mItem.props" :type="mItem.type" v-if="isNumber(mItem.verify)" clearable v-on="$listeners"></el-input>
      <el-input v-model="model[mItem.prop]" v-bind="mItem.props" :type="mItem.type" v-else clearable v-on="$listeners"></el-input>
    </template>
  </el-form-item>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CcInputTable from './CcInputTable.vue'
import CcInputTree from './CcInputTree.vue'
import CcInputDialog from './CcInputDialog.vue'
import CcInputIcon from './CcInputIcon.vue'
import CcCheckboxGroup from './CcCheckboxGroup.vue'
import CcSelect from './CcSelect.vue'
import {Action} from 'vuex-class'

@Component({components: {CcInputTable, CcInputTree, CcInputDialog, CcInputIcon, CcCheckboxGroup, CcSelect}})
export default class CcFromItem extends Vue {
  /* vue-props */
  @Prop({required: true, type: [Object]}) model
  @Prop({required: true}) item
  /* vue-vuex */
  @Action('getOptions') getOptions
  /* vue-data */
  data () {
    return {
      mItem: JSON.parse(JSON.stringify(this.item)),
      loading: false
    }
  }
  /* vue-compute */
  /* vue-watch */
  @Watch('item')
  itemChange () {
    this.mItem = JSON.parse(JSON.stringify(this.item))
  }
  @Watch('mItem', {immediate: true})
  mItemChange () {
    this.initOptions()
  }
  /* vue-lifecycle */
  /* vue-method */
  // 过滤form-item的props
  itemProps (item) {
    const {options, props, dialog, verify, placeholder, ...itemProps} = item
    if (verify && !verify.verify) {
      verify.verify = ''
    }
    if (placeholder) {
      item.props = item.props || {}
      item.props.placeholder = placeholder
    }
    return {...itemProps, ...verify}
  }
  // 日期控件默认格式
  datePickerFarmatter (item) {
    if (item.props && item.props.valueFormat) {
      return item.props.valueFormat
    } else {
      return (item.type === 'date' || item.type === 'daterange') ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'
    }
  }
  // 检查输入框的值是否是number，以判断是否要加number修饰符
  isNumber (verify) {
    return verify && (verify.number || verify.int || verify.maxDecimalLength || verify.gt || verify.gte || verify.lt || verify.lte)
  }
  // 在dialog的值变化的时候，触发一次校验
  onValueChange (prop) {
    this.$emit('value-change', prop)
  }
  //
  async initOptions () {
    if (this.mItem.options && typeof this.mItem.options === 'string') {
      this.loading = true
      const data = await this.getOptions('getOptions?name=' + this.mItem.options + '&type=' + this.mItem.type)
      this.loading = false
      if (data) {
        this.mItem.options = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
