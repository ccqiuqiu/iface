<!--Created by 熊超超 on 2018/5/31.-->
<template>
  <el-popover placement="bottom" trigger="click" v-model="show">
    <cc-table :rows="options.rows" :columns="options.columns"
              :row-key="rowKey"
              :selected-rows.sync="selectedRows"
              :current-row.sync="currentRow">
    </cc-table>
    <el-input slot="reference" type="text" readonly>
      <cc-icon slot="suffix" name="add" size="16"></cc-icon>
    </el-input>
  </el-popover>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class CcInputPopover extends Vue {
    /*vue-props*/
    @Prop({type: [String, Number, Array]}) private value: [String, Number, Array]
    @Prop() private options: any
    @Prop({default: 'id'}) private rowKey: string
    /*vue-vuex*/
    /*vue-data*/
    private show: boolean = false
    private selectedRows: any[] = []
    private currentRow: any = {}
    /*vue-compute*/
    get multi() {
      return !!this.options.columns.find((c: TableColumn) => c.type === 'selection')
    }
    /*vue-watch*/
    @Watch('currentRow')
    private currentRowChange(val: any) {
      if (!this.multi) {
        this.show = false
        this.$emit('input', val[this.rowKey])
      }
    }
    @Watch('selectedRows')
    private selectedRowsChange(val: any) {
      if (this.multi) {
        this.$emit('input', val.map((row: any) => row[this.rowKey]))
      }
    }
    /*vue-lifecycle*/
    private mounted() {
      if (this.value) {
        if (this.multi) {
          this.selectedRows = this.options.rows.filter((row: any) => this.value.includes(row[this.rowKey]))
        } else {
          this.currentRow = this.options.rows.find((row: any) => row[this.rowKey] === this.value)
        }
      }
    }
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>