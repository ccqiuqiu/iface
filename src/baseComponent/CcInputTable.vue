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

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import CcInputTags from './CcInputTags.vue'

  @Component({components: {CcInputTags}})
  export default class CcInputTable extends Vue {
    /*vue-props*/
    @Prop({type: [String, Number, Array]}) private value: string | number | Array<string | number>
    @Prop() private options: any
    @Prop({default: 'id'}) private valueField: string
    @Prop({default: 'name'}) private labelField: string
    /*vue-vuex*/
    /*vue-data*/
    private show: boolean = false
    private selectedRows: any[] = []
    private currentRow: any = null
    /*vue-compute*/
    get multi() {
      return !!this.options.columns.find((c: TableColumn) => c.type === 'selection')
    }
    get getSelectTag() {
      return (this.multi ? this.selectedRows : [this.currentRow]).filter((item: any) => item)
    }
    /*vue-watch*/
    @Watch('currentRow')
    private currentRowChange(val: any) {
      if (!this.multi && val) {
        this.show = false
        this.$emit('input', val[this.valueField])
      }
    }
    @Watch('selectedRows')
    private selectedRowsChange(val: any) {
      if (this.multi) {
        this.$emit('input', val.map((row: any) => row[this.valueField]))
      }
    }
    // 监听value是为了实现重置表单的时候，能更新表格
    @Watch('value')
    private valueChange(val: any, old: any) {
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
    /*vue-lifecycle*/
    private mounted() {
      this.init()
    }
    /*vue-method*/
    private init() {
      if (this.value) {
        if (this.multi) {
          this.selectedRows = this.options.rows.filter((row: any) => (this.value as Array<string | number>).includes(row[this.valueField]))
        } else {
          this.currentRow = this.options.rows.find((row: any) => row[this.valueField] === this.value)
        }
      }
    }
    private delTag(tag: any) {
      if (this.multi) {
        const index = this.selectedRows.findIndex((row: any) => row[this.valueField] === tag[this.valueField])
        this.selectedRows.splice(index, 1)
      } else {
        this.currentRow = null
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>