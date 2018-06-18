<!--Created by 熊超超 on 2018/5/31.-->
<template>
  <div>
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="show">
      <cc-table :rows="options.rows" :columns="options.columns"
                :row-key="valueField"
                :selected-rows.sync="selectedRows"
                :current-row.sync="currentRow">
      </cc-table>
    </el-popover>
    <cc-input-tags v-popover:popover v-model="getSelectTag" :label="labelField" @del="delTag" icon="table"/>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CcInputTags from './CcInputTags.vue'

@Component({components: {CcInputTags}})
export default class CcInputTable extends Vue {
  /* vue-props */
  @Prop({type: [String, Number, Array]}) value
  @Prop() options
  @Prop({default: 'id'}) valueField
  @Prop({default: 'text'}) labelField
  /* vue-vuex */
  /* vue-data */
  show = false
  selectedRows = []
  currentRow = null
  /* vue-compute */
  get multi () {
    return !!this.options.columns.find((c) => c.type === 'selection')
  }
  get getSelectTag () {
    return (this.multi ? this.selectedRows : [this.currentRow]).filter((item) => item)
  }
  /* vue-watch */
  @Watch('currentRow')
  currentRowChange (val) {
    if (!this.multi && val) {
      this.show = false
      this.$emit('input', val[this.valueField])
    }
  }
  @Watch('selectedRows')
  selectedRowsChange (val) {
    if (this.multi) {
      this.$emit('input', val.map((row) => row[this.valueField]))
    }
  }
  // 监听value是为了实现重置表单的时候，能更新表格
  @Watch('value')
  valueChange (val, old) {
    if (this.multi) {
      if (val.join(',') !== old.join(',')) {
        this.init()
      }
    } else {
      if (val !== old) {
        this.init()
      }
    }
  }
  /* vue-lifecycle */
  mounted () {
    this.init()
  }
  /* vue-method */
  init () {
    if (this.value) {
      if (this.multi) {
        this.selectedRows = this.options.rows.filter((row) => this.value.includes(row[this.valueField]))
      } else {
        this.currentRow = this.options.rows.find((row) => row[this.valueField] === this.value)
      }
    }
  }
  delTag (tag) {
    if (this.multi) {
      const index = this.selectedRows.findIndex((row) => row[this.valueField] === tag[this.valueField])
      this.selectedRows.splice(index, 1)
    } else {
      this.currentRow = null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
