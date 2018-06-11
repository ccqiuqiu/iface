<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <el-form v-loading="loading" ref="form" :model="data.model" :label-width="data.labelWidth || '100px'" v-bind="data.props" :inline="isSearch">
    <el-form-item v-bind="itemProps(item)" v-for="(item, index) in items" :key="item.id || index"
                  :class="{'is-required': item.verify && item.verify.canBeEmpty === undefined}">
      <!--选择框-->
      <el-select v-model="data.model[item.prop]" v-bind="item.props" v-if="item.type === 'select'">
        <el-option :label="option.label" :value="option.value" :key="option.value" v-for="option in item.options"/>
      </el-select>
      <!--日期，范围-->
      <el-date-picker v-model="data.model[item.prop]" v-bind="item.props" :type="item.type"
                      v-else-if="['date', 'datetime', 'daterange', 'datetimerange'].includes(item.type)"
                      :value-format="datePickerFarmatter(item)"></el-date-picker>
      <!--时间选择-->
      <el-time-select v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type=== 'timeselect'">
      </el-time-select>
      <!--时间、范围-->
      <el-time-picker v-model="data.model[item.prop]" v-bind="item.props" :is-range="item.type === 'timerange'"
                      v-else-if="['time', 'timerange'].includes(item.type)"
                      :value-format="item.props && item.props.valueFormat ? item.props.valueFormat : 'HH:mm:ss'">
      </el-time-picker>
      <!--开关-->
      <el-switch v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type === 'switch'"></el-switch>
      <!--单选-->
      <el-radio-group v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type === 'radio'">
        <el-radio v-bind="option" :label="option.value" :name="item.prop" :key="option.value" v-for="option in item.options">{{option.label}}</el-radio>
      </el-radio-group>
      <!--单选-按钮-->
      <el-radio-group v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type === 'radiobutton'">
        <el-radio-button v-bind="option" :label="option.value" :name="item.prop" :key="option.value" v-for="option in item.options">{{option.label}}</el-radio-button>
      </el-radio-group>
      <!--多选-->
      <cc-checkbox-group v-model="data.model[item.prop]" v-bind="item.props" :options="item.options" :type="item.type"
                         v-else-if="['checkbox', 'checkboxbutton'].includes(item.type)"></cc-checkbox-group>
      <!--级联选择器-->
      <el-cascader v-model="data.model[item.prop]" :options="item.options" v-bind="item.props" v-else-if="item.type === 'cascader'"/>
      <!--计数器-->
      <el-input-number v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type === 'number'"></el-input-number>
      <!--滑块-->
      <el-slider v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type === 'slider'"></el-slider>
      <!--评分-->
      <el-rate v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type === 'rate'"></el-rate>
      <!--popover-table-->
      <cc-input-table v-model="data.model[item.prop]" v-bind="item.props" :options="item.options" v-else-if="item.type === 'table'"></cc-input-table>
      <!--popover-tree-->
      <cc-input-tree v-model="data.model[item.prop]" v-bind="item.props" :options="item.options" v-else-if="item.type === 'tree'"></cc-input-tree>
      <!--弹出dialog-->
      <cc-input-dialog @input="onValueChange(item.prop)" :title="item.label" v-model="data.model[item.prop]" v-bind="item.props" :dialog="item.dialog" v-else-if="item.type === 'dialog'"></cc-input-dialog>
      <!--icon-->
      <cc-input-icon v-model="data.model[item.prop]" v-bind="item.props" v-else-if="item.type === 'icon'"></cc-input-icon>
      <!--input-->
      <template v-else>
        <el-input v-model.number="data.model[item.prop]" v-bind="item.props" :type="item.type" v-if="isNumber(item.verify)" clearable></el-input>
        <el-input v-model="data.model[item.prop]" v-bind="item.props" :type="item.type" v-else clearable></el-input>
      </template>
    </el-form-item>
    <!--操作按钮-->
    <div class="action">
      <cc-button v-bind="btn" v-for="(btn, index) in btns" :key="index" @click="btnClick(btn)"/>
    </div>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch} from 'vue-property-decorator'
  import CcInputTable from './CcInputTable.vue'
  import CcInputTree from './CcInputTree.vue'
  import CcInputDialog from './CcInputDialog.vue'
  import CcInputIcon from './CcInputIcon.vue'
  import CcCheckboxGroup from './CcCheckboxGroup.vue'
  import {Action} from 'vuex-class'

  // 按钮的动作map，在用户简单传入action的时候，设置默认的text等属性
  const btnActionMap: any = {
    save: {
      action: 'save',
      text: '保存',
      icon: 'save',
    },
    reset: {
      action: 'reset',
      text: '重置',
      icon: 'reset',
      type: '',
    },
    search: {
      action: 'search',
      text: '搜索',
      icon: 'search',
    },
  }

  @Component({components: {CcInputTable, CcInputTree, CcInputDialog, CcInputIcon, CcCheckboxGroup}})
  export default class CcForm extends Vue {
    /*vue-props*/
    @Prop({required: true, type: Object}) private data: FormObject
    @Prop(Boolean) private isSearch: boolean
    @Prop(String) private url: string
    /*vue-vuex*/
    @Action('getOptions') private getOptions: (url: string) => Promise<any>
    @Action('requestUrl') private requestUrl: (url: string) => Promise<ActionReturn>
    @Action('formAction') private formAction: (params: {url: string, params: any}) => Promise<ActionReturn>
    /*vue-data*/
    private defaultModel: any = {...this.data.model} // 保存一份原始数据的拷贝，用于重置表单
    private loading: boolean = false
    private items: FormItem[] = this.data.items || []
    /*vue-compute*/
    // 处理按钮数组
    get btns() {
      if (this.data.btns) {
        return this.data.btns.map((btn: FormBtn) => {
          btn.text = btn.text || btnActionMap[btn.action].text
          btn.icon = btn.icon || btnActionMap[btn.action].icon
          btn.type = btn.type || btnActionMap[btn.action].type
          return btn
        })
      } else {
        return [
          btnActionMap[this.isSearch ? 'search' : 'save'],
          btnActionMap.reset,
        ]
      }
    }
    /*vue-watch*/
    @Watch('url', {immediate: true})
    private urlChange(val: string) {
      if (val) {
        this.initModel()
      }
    }
    /*vue-lifecycle*/
    private created() {
      this.initOptions()
    }
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
    // 按钮点击事件
    private async btnClick(btn: FormBtn) {
      if (btn.action === 'reset') {
        (this.$refs.form as Vue).resetFields()
        this.data.model = {...this.defaultModel}
      } else {
        (this.$refs.form as Vue).validate(async (valid: boolean) => {
          if (valid) {
            this.loading = true
            const {error} = await this.formAction({url: btn.action + this.data.name, params: this.data.model})
            this.loading = false
            this.$emit(btn.action, error)
          }
        })
      }
    }
    // 初始化选择类控件的options的值
    private initOptions() {
      (this.data.items as FormItem[])
        .filter((item: FormItem) => item.options && typeof item.options === 'string')
        .forEach((item: FormItem) => this.getOptionsSync(item))
    }
    // 异步查询options的值。赋值给options
    private async getOptionsSync(item: FormItem) {
      const data = await this.getOptions('getOptions?query=' + item.options as string)
      if (data) {
        item.options = data
      }
    }
    // 初始化model。用于更新表单从服务端获取完整数据
    private async initModel() {
      this.loading = true
      const {data} = await this.requestUrl(this.url)
      this.loading = false
      if (data) {
        this.data.model = data
      }
    }
    // 检查输入框的值是否是number，以判断是否要加number修饰符
    private isNumber(verify: any) {
      return verify && (verify.number || verify.int || verify.maxDecimalLength || verify.gt || verify.gte || verify.lt || verify.lte)
    }
    // 在dialog的值变化的时候，触发一次校验
    private onValueChange(prop: string) {
      (this.$refs.form as Vue).validateField(prop, () => null)
    }
  }
</script>

<style lang="scss" scoped>
</style>