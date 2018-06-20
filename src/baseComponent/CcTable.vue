<!--Created by 熊超超 on 2018/5/5.-->
<template>
  <el-table ref="table" :data="rows" v-bind="$attrs"
            v-on="$listeners"
            :row-key="rowKey"
            stripe
            :highlight-current-row="!multi"
            @select="select"
            @select-all="select"
            @row-click="rowClick"
            @current-change="currentChange">
    <el-table-column type="selection" width="55" v-if="multi" />
    <template v-for="(column, index) in columns">
      <el-table-column v-if="column.renderCell" v-bind="column">
        <template slot-scope="scope">
          <cc-render :render-fun="column.renderCell" :scope="scope"></cc-render>
        </template>
      </el-table-column>
      <el-table-column v-bind="column" v-else/>
    </template>
  </el-table>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import CcRender from '@bc/CcRender.vue'
  @Component({components: {CcRender}})
  export default class CcTable extends Vue {
    /*vue-prop*/
    @Prop() private rows: any[]
    @Prop({default: 'id'}) private rowKey: string
    @Prop() private columns: TableColumn[]
    @Prop(Boolean) private multiSelect: boolean // 是否多选
    @Prop() private selectedRows: any[] // 选中的行的数组
    @Prop() private currentRow: any  // 当前行
    /*vue-data*/
    /*vue-computed*/
    get multi() {
      return this.multiSelect || !!this.columns.find((c: TableColumn) => c.type === 'selection')
    }
    /**
     * 结合selectionChange方法，实现selectedRows双向绑定
     */
    @Watch('selectedRows')
    private watchSelectedRows(val: any[], old: any[]) {
      (this.$refs.table as Vue).clearSelection()
      if (val) {
        this.$nextTick(() => val.forEach((row: any) => {
          (this.$refs.table as Vue).toggleRowSelection(row, true)
        }))
      }
    }
    /**
     * 结合currentChange方法，实现currentRow双向绑定
     */
    @Watch('currentRow')
    private watchCurrentRow(val: any, old: any) {
      if (val) {
        this.$nextTick(() => setTimeout((this.$refs.table as Vue).setCurrentRow(val), 0))
      } else {
        this.$nextTick(() => setTimeout((this.$refs.table as Vue).setCurrentRow(), 0))
      }
    }
    private currentChange(row: any) {
      if (row) {
        this.$emit('update:currentRow', row)
      }
    }
    private select(rows: any[], row: any) {
      this.$emit('update:selectedRows', rows)
    }
    // 多选的时候，让点击行的时候，也能选中和取消选中行
    private rowClick(row: any) {
      if (this.multi) {
        const index = this.selectedRows.findIndex((item: any) => item[this.rowKey] === row[this.rowKey])
        if (index >= 0) {
          this.selectedRows.splice(index, 1)
        } else {
          this.selectedRows.push(row)
        }
      } else {
        this.$emit('single-click')
      }
    }
    //
    private toggleRowSelection(rows: any[]) {
      rows.forEach((row: any) => {
        (this.$refs.table as Vue).toggleRowSelection(row, true)
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
