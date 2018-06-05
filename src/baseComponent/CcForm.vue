<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <el-form ref="form" :model="data.model" :label-width="data.labelWidth || '100px'" v-bind="data.props" :inline="data.props && data.props.type === 'search'">
    <el-form-item v-bind="itemProps(item)" v-for="(item, index) in data.items" :key="item.id || index">
      <!--选择框-->
      <el-select v-model="data.model[item.field]" v-bind="item.props" v-if="item.type === 'select'">
        <el-option :label="option.label" :value="option.value" :key="option.value" v-for="option in item.options"/>
      </el-select>
      <!--日期，范围-->
      <el-date-picker v-model="data.model[item.field]" v-bind="item.props" :type="item.type"
                      v-else-if="['date', 'datetime', 'daterange', 'datetimerange'].includes(item.type)"
                      :value-format="datePickerFarmatter(item)"></el-date-picker>
      <!--时间选择-->
      <el-time-select v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type=== 'timeselect'">
      </el-time-select>
      <!--时间、范围-->
      <el-time-picker v-model="data.model[item.field]" v-bind="item.props" :is-range="item.type === 'timerange'"
                      v-else-if="['time', 'timerange'].includes(item.type)"
                      :value-format="item.props && item.props.valueFormat ? item.props.valueFormat : 'HH:mm:ss'">
      </el-time-picker>
      <!--开关-->
      <el-switch v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'switch'"></el-switch>
      <!--单选-->
      <el-radio-group v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'radio'">
        <el-radio v-bind="option" :label="option.value" :name="item.field" :key="option.value" v-for="option in item.options">{{option.label}}</el-radio>
      </el-radio-group>
      <!--单选-按钮-->
      <el-radio-group v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'radiobutton'">
        <el-radio-button v-bind="option" :label="option.value" :name="item.field" :key="option.value" v-for="option in item.options">{{option.label}}</el-radio-button>
      </el-radio-group>
      <!--多选-->
      <el-checkbox-group v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'checkbox'">
        <el-checkbox v-bind="option" :label="option.value" :name="item.field" :key="option.value" v-for="option in item.options">{{option.label}}</el-checkbox>
      </el-checkbox-group>
      <!--多选-按钮-->
      <el-checkbox-group v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'checkboxbutton'">
        <el-checkbox-button v-bind="option" :label="option.value" :name="item.field" :key="option.value" v-for="option in item.options">{{option.label}}</el-checkbox-button>
      </el-checkbox-group>
      <!--级联选择器-->
      <el-cascader v-model="data.model[item.field]" :options="item.options" v-bind="item.props" v-else-if="item.type === 'cascader'"/>
      <!--计数器-->
      <el-input-number v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'number'"></el-input-number>
      <!--滑块-->
      <el-slider v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'slider'"></el-slider>
      <!--评分-->
      <el-rate v-model="data.model[item.field]" v-bind="item.props" v-else-if="item.type === 'rate'"></el-rate>
      <!--popover-table-->
      <cc-input-table v-model="data.model[item.field]" v-bind="item.props" :options="item.options" v-else-if="item.type === 'table'"></cc-input-table>
      <!--popover-tree-->
      <cc-input-tree v-model="data.model[item.field]" v-bind="item.props" :options="item.options" v-else-if="item.type === 'tree'"></cc-input-tree>
      <!--弹出dialog-->
      <cc-input-dialog :title="item.label" v-model="data.model[item.field]" v-bind="item.props" :dialog="item.dialog" v-else-if="item.type === 'dialog'"></cc-input-dialog>
      <!--input-->
      <el-input v-model="data.model[item.field]" v-bind="item.props" :type="item.type" v-else></el-input>
    </el-form-item>
    <!--操作按钮-->
    <div class="action">
      <cc-button v-bind="btn" v-for="(btn, index) in btns" :key="index" @click="btnClick(btn)"/>
    </div>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue, Prop} from 'vue-property-decorator'
  import CcInputTable from './CcInputTable.vue'
  import CcInputTree from './CcInputTree.vue'
  import CcInputDialog from './CcInputDialog.vue'

  // 按钮的动作map，在用户简单传入action的时候，设置默认的text等属性
  const btnActionMap: any = {
    save: {
     text: '保存',
     icon: 'save',
    },
    reset: {
     text: '重置',
     icon: 'reset',
     type: '',
    },
    search: {
      text: '搜索',
      icon: 'search',
    },
  }

  @Component({components: {CcInputTable, CcInputTree, CcInputDialog}})
  export default class CcForm extends Vue {
    /*vue-props*/
    @Prop({required: true, type: Object}) private data: any
    /*vue-vuex*/
    /*vue-data*/
    private defaultModel: any = {...this.data.model} // 保存一份原始数据的拷贝，用于重置表单
    /*vue-compute*/
    // 处理按钮数组
    get btns() {
      return this.data.btns.map((btn: FormBtn) => {
        btn.text = btn.text || btnActionMap[btn.action].text
        btn.icon = btn.icon || btnActionMap[btn.action].icon
        btn.type = btn.type || btnActionMap[btn.action].type
        return btn
      })
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    private created() {
      // 如果控件的options为url说明要通过查询获得选项，那么先查询
    }
    /*vue-method*/
    // 过滤form-item的props
    private itemProps(item: FormItem) {
      const {options, props, dialog, ...itemProps} = item
      return itemProps
    }
    private datePickerFarmatter(item: FormItem) {
      if (item.props && item.props.valueFormat) {
        return item.props.valueFormat
      } else {
        return (item.type === 'date' || item.type === 'daterange') ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm:ss'
      }
    }
    // 按钮点击事件
    private btnClick(btn: FormBtn) {
      if (btn.action === 'reset') {
        (this.$refs as Vue).form.resetFields()
        this.data.model = {...this.defaultModel}
      } else {
        this.$emit(btn.action, btn.url)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>