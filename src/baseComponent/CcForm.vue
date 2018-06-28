<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <el-form v-loading="loading" ref="form" :model="data.model" :label-width="data.labelWidth || '100px'" v-bind="data.props" :inline="isSearch">
    <cc-form-item
        @blur="$emit('blur', item.prop)"
        @keyup.native="$emit('keyup', item.prop)"
        @change="$emit('change', item.prop)"
        :model="data.model"
        :no-verify="isSearch"
        :item="item" @value-change="onValueChange" v-for="(item, index) in items" :key="item.prop || index"></cc-form-item>
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
    @Prop({required: true, type: Object}) public data: FormObject
    @Prop(Boolean) public isSearch: boolean
    @Prop(String) public url: string
    /*vue-vuex*/
    @Action('getOptions') public getOptions: (url: string) => Promise<any>
    @Action('requestUrl') public requestUrl: (url: string) => Promise<ActionReturn>
    @Action('formAction') public formAction: (params: {url: string, params: any}) => Promise<ActionReturn>
    /*vue-data*/
    public defaultModel: any = {...this.data.model} // 保存一份原始数据的拷贝，用于重置表单
    public loading: boolean = false
    public items: CRUDItem[] = []
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
    public urlChange(val: string) {
      if (val) {
        this.initModel()
      }
    }
    @Watch('data', {immediate: true})
    public dataChange(val: CRUDObject) {
      if (val.items) {
        this.items = val.items
      }
    }
    /*vue-lifecycle*/
    /*vue-method*/
    // 按钮点击事件
    public async btnClick(btn: FormBtn) {
      if (btn.action === 'reset') {
        (this.$refs.form as Vue).resetFields()
        this.data.model = {...this.defaultModel}
      } else {
        (this.$refs.form as Vue).validate(async (valid: boolean) => {
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
    // public initOptions() {
    //   (this.data.items as FormItem[])
    //     .forEach((item: FormItem, index: number) => this.getOptionsSync(item, index))
    // }
    // 异步查询options的值。赋值给options
    // public async getOptionsSync(item: FormItem, index: number) {
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
    public async initModel() {
      this.loading = true
      const {data} = await this.requestUrl(this.url)
      this.loading = false
      if (data) {
        this.data.model = data
      }
    }
    // 在dialog的值变化的时候，触发一次校验
    public onValueChange(prop: string) {
      (this.$refs.form as Vue).validateField(prop, () => null)
    }
  }
</script>

<style lang="scss" scoped>
</style>