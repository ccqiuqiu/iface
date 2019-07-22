<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <el-form v-loading="loading" ref="form" :model="data.model"
           :label-width="data.labelWidth || '100px'"
           :label-position="data.labelPosition || 'right'"
           v-bind="data.props"
           :class="{'full-width': fullWidth}"
           :inline="isSearch" v-if="show">
    <template v-for="(item, index) in items">
      <cc-form-item :class="{'cc-form-item-full':item.full}"
                    @blur="$emit('blur', item.prop)"
                    @focus="$emit('focus', item.prop)"
                    @keyup.native="$emit('keyup', item.prop)"
                    @change="(value) => $emit('change', item.prop, value)"
                    @halfChecked="(value) => halfChecked(item.prop, value)"
                    @selected-obj="(value) => $emit('selected-obj', item.prop, value)"
                    v-if="!item.isShow || item.isShow(data.model)"
                    :model="data.model" :isSearch="isSearch"
                    :no-verify="isSearch || noVerify"
                    :item="item" @value-change="onValueChange" :key="item.prop || index"></cc-form-item>
    </template>
    <div class="action" v-if="btns && btns.length">
      <cc-button v-bind="btn" v-for="(btn, index) in btns" :key="index" @click="btnClick(btn)"/>
    </div>
  </el-form>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CcFormItem from './CcFormItem.vue'
import { Action } from 'vuex-class'

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
  },
  close: {
    action: 'close',
    text: '关闭',
    icon: 'close'
  }
}

export default @Component({ components: { CcFormItem } }) class CcForm extends Vue {
    /* vue-props */
    @Prop({ required: true, type: Object }) data
    @Prop(Boolean) isSearch
    @Prop(Function) getModelMethod
    @Prop(String) saveUrl
    @Prop(Boolean) noVerify
    @Prop(Boolean) fullWidth
    @Prop(String) getUrl
    /* vue-vuex */
    @Action requestUrl
    /* vue-data */
    loading = false
    show = true
    items = []
    halfCheckedList = {}
    data () {
      return {
        defaultModel: JSON.parse(JSON.stringify(this.data.model)) // 保存一份原始数据的拷贝，用于重置表单
      }
    }
    /* vue-compute */
    // 处理按钮数组
    get btns () {
      if (this.data.btns) {
        return this.data.btns
      } else {
        return [
          btnActionMap[this.isSearch ? 'search' : 'save'],
          btnActionMap['reset']
        ]
      }
    }
    /* vue-watch */
    // @Watch('data.model')
    // modelChange(val) {
    //   this.defaultModel = JSON.parse(JSON.stringify(this.data.model))
    // }
    @Watch('getUrl', { immediate: true })
    getUrlChange (val) {
      if (val) {
        this.initModel()
      }
    }
    @Watch('getModelMethod', { immediate: true })
    getModelMethodChange (val) {
      if (val) {
        this.initModel()
      }
    }
    @Watch('data', { immediate: true })
    dataChange (val) {
      if (val.items) {
        this.items = val.items
        this.defaultModel = JSON.parse(JSON.stringify(val.model)) // 保存一份原始数据的拷贝，用于重置表单
      }
    }
    /* vue-lifecycle */
    /* vue-method */
    // 按钮点击事件
    async btnClick (btn) {
      if (btn.action === 'reset') {
        this.$refs.form.resetFields()
        this.data.model = JSON.parse(JSON.stringify(this.defaultModel))
      } else if (btn.action === 'back') {
        // this.$router.back()
        btn.cb()
      } else {
        // 点击的不是重置按钮，先校验表单
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            // 校验通过后，如果按钮有回调，直接执行回调
            if (btn.cb) {
              btn.cb()
            } else { // 没有回调的情况
              // 搜索按钮直接发送事件
              if (btn.action === 'search') {
                this.$emit(btn.action)
              } else { // 非搜索按钮，执行action
                let pass = true
                // 先执行before-*方法，如果返回true，继续执行否则不执行
                if (this.$attrs['before-' + btn.action]) {
                  pass = (this.$attrs)['before-' + btn.action]()
                }
                if (pass) {
                  this.loading = true
                  const url = this.saveUrl || this.data.name
                  const params = JSON.parse(JSON.stringify(this.data.model))
                  // 处理半选节点
                  for (let [key, value] of Object.entries(this.halfCheckedList)) {
                    if (params[key] && Array.isArray(params[key])) {
                      params[key] = params[key].concat(value)
                    }
                  }
                  // 支持传递按钮的处理函数
                  if (this.$attrs[btn.action + 'Handler']) {
                    await this.$attrs[btn.action + 'Handler'](this.data.model)
                    this.loading = false
                    return
                  }
                  const re = await this.requestUrl({ url, params: params, method: this.data.model.id ? 'put' : 'post' })
                  this.loading = false
                  this.$emit(btn.action, re)
                }
              }
            }
          }
        })
      }
    }
    // 初始化model。用于更新表单从服务端获取完整数据
    async initModel () {
      this.loading = true
      let model = this.data.model
      if (this.getUrl) {
        const { data } = await this.requestUrl({ url: this.getUrl })
        if (data) {
          model = data
        }
      } else {
        model = await this.getModelMethod()
      }
      this.loading = false
      this.data.model = model
      this.defaultModel = JSON.parse(JSON.stringify(this.data.model))
    }
    // 在dialog的值变化的时候，触发一次校验
    onValueChange (prop) {
      this.$refs.form.validateField(prop, () => null)
    }
    submit (cb) {
      this.$refs.form.validate(async (valid) => {
        if (valid && cb) {
          cb()
        }
      })
    }
    validate (func) {
      this.$refs.form.validate(func)
    }
    clearValidate () {
      this.$nextTick(() => this.$refs.form.clearValidate())
    }
    forceUpdate () {
      this.show = false
      this.$nextTick(() => (this.show = true))
    }
    halfChecked (prop, value) {
      this.halfCheckedList[prop] = value
      this.$emit('halfChecked', prop, value)
    }
}
</script>

<style lang="scss" scoped>
</style>
