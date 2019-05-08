<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-input-tags @click.native="show" v-model="selectTag" :label="labelField" :collapseTags="collapseTags" @del="delTag" icon="dialog"/>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CcInputTags from './CcInputTags.vue'
import { Action } from 'vuex-class'
import { initOptions } from '../assets/utils/crudUtils.jsx'

export default @Component({ components: { CcInputTags } }) class CcInputDialog extends Vue {
  /* vue-props */
  @Prop() dialog
  @Prop(String) title
  @Prop({ type: [Array, Object] }) value
  @Prop({ type: String, default: 'id' }) valueField
  @Prop({ type: String, default: 'name' }) labelField
  @Prop(Boolean) collapseTags
  @Prop(Boolean) multiSelect
  /* vue-vuex */
  @Action requestUrl
  /* vue-data */
  selectData = []
  selectTag = []
  rows = []
  /* vue-compute */

  /* vue-watch */
  @Watch('value')
  valueChange (val) {
    this.updateSelectTag()
  }
  @Watch('dialog', { immediate: true })
  dialogChange (val) {
    if (val && val.name && this.rows.length === 0) {
      this.getTableData(val.name)
    }
  }

  @Watch('multiSelect')
  multiChange (val) {
    if (val && this.value && !Array.isArray(this.value)) {
      this.$emit('input', [this.value])
    }
    if (!val && this.value && Array.isArray(this.value)) {
      this.$emit('input', this.value[0])
    }
  }
  /* vue-lifecycle */
  /* vue-method */
  async getTableData (name) {
    await initOptions(this.dialog)
    const { data } = await this.requestUrl({ url: name, params: { pageSize: 0 } })
    if (data) {
      this.rows = data.rows
      this.updateSelectTag()
    }
  }
  updateSelectTag () {
    if (this.value) {
      if (typeof this.value === 'string') {
        this.selectTag = this.rows.filter((row) => row[this.valueField] === this.value)
      } else {
        this.selectTag = this.rows.filter((row) => this.value.includes(row[this.valueField]))
      }
    } else {
      this.selectTag = []
    }
  }
  // 显示弹窗
  async show () {
    if (this.dialog) {
      this.selectData = JSON.parse(JSON.stringify(this.selectTag))
      this.$utils.dialog(this.title, (h) => <div>
        <cc-crud data={this.dialog} type='dialog'
          value={this.selectData}
          multiSelect={this.multiSelect}
          onRowClick={this.rowClick}
          onInput={this.onChange}></cc-crud>
        {this.multiSelect && <div class='action'>
          <el-button type='primary' onClick={this.select}>选择</el-button>
        </div>}
      </div>)
    }
  }
  // 删除标签
  delTag (item) {
    if (Array.isArray(this.selectTag)) {
      const index = this.selectTag.findIndex(tag => tag[this.valueField] === item[this.valueField])
      this.selectTag.splice(index, 1)
    } else {
      this.selectTag = []
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
    // console.log(this.selectData)
    let re = {}
    if (Array.isArray(this.selectData)) {
      re = this.selectData.map((row) => {
        const tag = {}
        tag[this.valueField] = row[this.valueField]
        tag[this.labelField] = row[this.labelField]
        return tag
      })
      this.$emit('input', re.map((item) => item[this.valueField]))
    } else {
      re[this.valueField] = this.selectData[this.valueField]
      re[this.labelField] = this.selectData[this.labelField]
      this.$emit('input', re[this.valueField])
    }
    this.$utils.hideDialog()
  }
}
</script>

<style lang="scss" scoped>
</style>
