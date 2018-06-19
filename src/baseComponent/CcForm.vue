<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <el-form v-loading="loading" ref="form" :model="data.model" :label-width="data.labelWidth || '100px'" v-bind="data.props" :inline="isSearch">
    <cc-form-item @blur="$emit('blur', item.prop)" :model="data.model" :item="item" @value-change="onValueChange" v-for="(item, index) in items" :key="item.prop || index"></cc-form-item>
    <div class="action" v-if="btns && btns.length">
      <cc-button v-bind="btn" v-for="(btn, index) in btns" :key="index" @click="btnClick(btn)"/>
    </div>
  </el-form>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CcFormItem from './CcFromItem.vue'
import {Action} from 'vuex-class'

// 按钮的动作map，在用户简单传入action的时候，设置默认的text等属性
const btnActionMap = {
  save: {
    action: 'save',
    text: '保存',
    icon: 'save'
  },
  reset: {
    action: 'reset',
    text: '重置',
    icon: 'reset',
    type: ''
  },
  search: {
    action: 'search',
    text: '搜索',
    icon: 'search'
  }
}

@Component({components: {CcFormItem}})
export default class CcForm extends Vue {
  /* vue-props */
  @Prop({required: true, type: Object}) data
  @Prop(Boolean) isSearch
  @Prop(String) url
  /* vue-vuex */
  @Action('getOptions') getOptions
  @Action('requestUrl') requestUrl
  @Action('formAction') formAction
  /* vue-data */
  data () {
    return {
      defaultModel: {...this.data.model}, // 保存一份原始数据的拷贝，用于重置表单
      loading: false,
      items: []
    }
  }

  /* vue-compute */
  // 处理按钮数组
  get btns () {
    if (this.data.btns) {
      return this.data.btns.map((btn) => {
        btn.text = btn.text || btnActionMap[btn.action].text
        btn.icon = btn.icon || btnActionMap[btn.action].icon
        btn.type = btn.type || btnActionMap[btn.action].type
        return btn
      })
    } else {
      return [
        btnActionMap[this.isSearch ? 'search' : 'save'],
        btnActionMap.reset
      ]
    }
  }
  /* vue-watch */
  @Watch('url', {immediate: true})
  urlChange (val) {
    if (val) {
      this.initModel()
    }
  }
  @Watch('data', {immediate: true})
  dataChange (val) {
    if (val.items) {
      this.items = val.items
    }
  }
  /* vue-lifecycle */
  /* vue-method */
  // 按钮点击事件
  async btnClick (btn) {
    if (btn.action === 'reset') {
      this.$refs.form.resetFields()
      this.data.model = {...this.defaultModel}
    } else {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (btn.cb) {
            btn.cb()
          } else {
            this.loading = true
            const {error} = await this.formAction({url: btn.action + this.data.name, params: this.data.model})
            this.loading = false
            this.$emit(btn.action, error)
          }
        }
      })
    }
  }
  // 此段交由item自行处理，不再在表单里面统一处理
  // 初始化选择类控件的options的值
  // private initOptions() {
  //   (this.data.items as FormItem[])
  //     .forEach((item: FormItem, index: number) => this.getOptionsSync(item, index))
  // }
  // 异步查询options的值。赋值给options
  // private async getOptionsSync(item: FormItem, index: number) {
  //   if (!item.options || typeof item.options !== 'string') {
  //     return
  //   }
  //   const data = await this.getOptions('getOptions?query=' + item.options as string)
  //   if (data) {
  //     const newItem = JSON.parse(JSON.stringify(item))
  //     newItem.options = data
  //     this.items.splice(index, 1, newItem)
  //   }
  // }
  // 初始化model。用于更新表单从服务端获取完整数据
  async initModel () {
    this.loading = true
    const {data} = await this.requestUrl(this.url)
    this.loading = false
    if (data) {
      this.data.model = data
    }
  }
  // 在dialog的值变化的时候，触发一次校验
  onValueChange (prop) {
    this.$refs.form.validateField(prop, () => null)
  }
}
</script>

<style lang="scss" scoped>
</style>
