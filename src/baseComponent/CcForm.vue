<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <el-form v-loading="loading" ref="form" :model="data.model" :label-width="data.labelWidth || '100px'" v-bind="data.props" :inline="isSearch">
    <cc-form-item :model="data.model" :item="item"  v-for="(item, index) in items" :key="item.id || index"></cc-form-item>
    <div class="action" v-if="btns && btns.length">
      <cc-button v-bind="btn" v-for="(btn, index) in btns" :key="index" @click="btnClick(btn)"/>
    </div>
  </el-form>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch} from 'vue-property-decorator'
  import CcFormItem from './CcFromItem.vue'
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

  @Component({components: {CcFormItem}})
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
    // 在dialog的值变化的时候，触发一次校验
    private onValueChange(prop: string) {
      (this.$refs.form as Vue).validateField(prop, () => null)
    }
  }
</script>

<style lang="scss" scoped>
</style>