<!--Created by 熊超超 on 2018/6/19.-->
<template>
  <div class="root" v-if="item">
    <el-tag size="medium" @click.native="click(rule)" :type="rule.selected ? '' : 'info'" v-for="(rule) in rules" :key="rule.code">
      <span>{{rule.name}}</span>
      <el-input size="mini" @keyup.native="keyup" v-model.number="rule.value" v-if="rule.type !== 'boolean'" type="number"></el-input>
    </el-tag>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator'
export default @Component class FormItemVerify extends Vue {
  /* vue-props */
  @Prop() item
  /* vue-vuex */
  /* vue-data */
  verifyRules = [
    { name: '必填', code: 'required', selected: false, type: 'boolean' },
    { name: '长度', code: 'length', selected: false, value: '', type: 'number' },
    { name: '最短', code: 'minLength', selected: false, value: '', type: 'number' },
    { name: '最长', code: 'maxLength', selected: false, value: '', type: 'number' },
    { name: '大于', code: 'gt', selected: false, value: '', type: 'number' },
    { name: '大于等于', code: 'gte', selected: false, value: '', type: 'number' },
    { name: '小于', code: 'lt', selected: false, value: '', type: 'number' },
    { name: '小于等于', code: 'lte', selected: false, value: '', type: 'number' },
    { name: '最多小数位', code: 'maxDecimalLength', selected: false, value: '', type: 'number' },
    { name: '数字', code: 'number', selected: false, type: 'boolean' },
    { name: '整数', code: 'int', selected: false, type: 'boolean' },
    { name: '手机号', code: 'phone', selected: false, type: 'boolean' },
    { name: '邮箱', code: 'email', selected: false, type: 'boolean' },
    { name: '数字验证码', code: 'verifyCode', selected: false, type: 'boolean' }
  ]
  /* vue-compute */
  get verifyRulesFilter () {
    if (!['text', 'password', 'textarea'].includes(this.item.type)) {
      return this.verifyRules.slice(0, 1)
    } else {
      return this.verifyRules
    }
  }
  get rules () {
    return this.verifyRulesFilter.map((r) => {
      const clone = { ...r }
      if (this.item && this.item.verify) {
        const value = this.item.verify[r.code]
        clone.selected = !!value
        if (clone.type !== 'boolean') {
          clone.value = value || ''
        }
      }
      return clone
    })
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  click (rule) {
    if (rule.type === 'boolean') {
      if (rule.selected) {
        delete this.item.verify[rule.code]
      } else {
        this.item.verify = this.item.verify || {}
        this.item.verify[rule.code] = true
      }
      this.$emit('change')
    }
  }
  keyup () {
    const re = {}
    this.rules.forEach((r) => {
      if (r.type !== 'boolean') {
        r.selected = !!r.value
      }
      if (r.selected) {
        re[r.code] = r.type === 'boolean' ? true : r.value
      }
    })
    if (!this.$utils.isEmptyObject(re)) {
      this.item.verify = re
    } else {
      delete this.item.verify
    }
    this.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
  .root{
    .el-tag{
      cursor: pointer;
      margin: 5px;
    }
  }
</style>
