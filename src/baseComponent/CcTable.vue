<!--Created by 熊超超 on 2018/5/5.-->
<template>
  <el-table ref="table" :data="data" v-bind="$attrs"
            v-on="$listeners"
            @current-change="currentChange"
            @selection-change="selectionChange">
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
    @Prop() private data: any[]
    @Prop() private columns: TableColumn[]
    @Prop() private selectedRows: any[] // 选中的行的数组
    @Prop() private currentRow: any  // 当前行
    /*vue-data*/
    private mSelectedRows: any[] = this.selectedRows
    private mCurrentRow: any = this.currentRow

    /**
     * 结合selectionChange方法，实现selectedRows双向绑定
     */
    @Watch('selectedRows')
    private watchSelectedRows(val: any[], old: any[]) {
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
      }
    }
    private selectionChange(rows: any[]) {
      this.mSelectedRows = rows
      this.$emit('update:selectedRows', rows)
    }
    private currentChange(row: any) {
      this.mCurrentRow = row
      this.$emit('update:currentRow', row)
    }
  }
</script>

<style lang="scss" scoped>
</style>
