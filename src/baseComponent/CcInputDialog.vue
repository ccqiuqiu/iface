<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-input-tags @click.native="show" v-model="getSelectTag" :label="labelField"  @del="delTag" icon="dialog"/>
  </div>
</template>

<script lang="jsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CcInputTags from './CcInputTags.vue'

@Component({components: {CcInputTags}})
export default class CcInputDialog extends Vue {
  /* vue-props */
  @Prop() dialog
  @Prop() title
  @Prop({type: [Array, Object]}) value
  @Prop({default: 'id'}) valueField
  @Prop({default: 'text'}) labelField
  /* vue-vuex */
  /* vue-data */
  selectData = {}
  /* vue-compute */
  get getSelectTag () {
    return this.value ? (Array.isArray(this.value) ? this.value : [this.value]) : []
  }

  /* vue-watch */
  /* vue-lifecycle */

  /* vue-method */
  // 显示弹窗
  show () {
    if (this.dialog) {
      this.selectData = JSON.parse(JSON.stringify(this.getSelectTag))
      this.$utils.dialog(this.title, (h) => <div>
        <cc-crud data={this.dialog} type='dialog' value={this.selectData} onRowClick={this.rowClick} onInput={this.onChange}></cc-crud>
        {Array.isArray(this.value) && <div class='action'>
          <el-button type='primary' onClick={this.select}>选择</el-button>
        </div>}
      </div>)
    }
  }
  // 删除标签
  delTag (item) {
    if (Array.isArray(this.value)) {
      const index = this.value.findIndex((tag) => tag[this.valueField] = item[this.valueField])
      this.value.splice(index, 1)
    } else {
      this.$emit('input', null)
    }
  }
  onChange (val) {
    this.selectData = val
  }
  rowClick () {
    setTimeout(() => this.select(), 0)
  }
  // 点击选择按钮
  select () {
    let re = {}
    if (Array.isArray(this.selectData)) {
      re = this.selectData.map((row) => {
        const tag = {}
        tag[this.valueField] = row[this.valueField]
        tag[this.labelField] = row[this.labelField]
        return tag
      })
    } else {
      re[this.valueField] = this.selectData[this.valueField]
      re[this.labelField] = this.selectData[this.labelField]
    }
    this.$emit('input', re)
    this.$utils.hideDialog()
  }
}
</script>

<style lang="scss" scoped>
</style>
