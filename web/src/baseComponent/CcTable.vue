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
      <el-table-column v-if="column.type=='index'" width="50" align="center" type="index" :label="column.label||'序号'" :key="index"></el-table-column>
      <el-table-column v-else v-bind="column"
                       :showOverflowTooltip="isShowTooltip(column)" :key="index">
        <template slot-scope="scope">
          <div v-if="column.btns" class="action">
            <span  v-for="(btn, index) in column.btns" :key="index"><el-button
              plain
              size="mini"
              type="primary"
              :icon="btn.icon"
              v-bind="btn.props"
              @click.stop="btn.cb({value: scope.row[scope.column['property']], row: scope.row, index: scope.$index})"
            >{{btn.text}}</el-button>
              </span>
          </div>
          <div v-else-if="column.template">
            {{ column.template ? column.template(scope.row[column.key]) : scope.row[column.key] }}
          </div>
          <cc-render :column="column" :scope="scope"></cc-render>
        </template>
      </el-table-column>
      <!--<el-table-column v-bind="column" v-else/>-->
    </template>
  </el-table>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import CcRender from './CcRender.vue'
export default @Component({ components: { CcRender } }) class CcTable extends Vue {
  /* vue-prop */
  @Prop() rows
  @Prop({ default: 'id' }) rowKey
  @Prop() columns
  @Prop(Boolean) multiSelect // 是否多选
  @Prop() selectedRows // 选中的行的数组
  @Prop() currentRow // 当前行
  /* vue-data */
  /* vue-computed */
  get multi () {
    return this.multiSelect
  }
  /**
   * 结合selectionChange方法，实现selectedRows双向绑定
   */
  @Watch('selectedRows')
  watchSelectedRows (val, old) {
    this.$refs.table.clearSelection()
    if (val) {
      this.$nextTick(() => val.forEach((row) => {
        this.$refs.table.toggleRowSelection(row, true)
      }))
    }
  }
  /**
   * 结合currentChange方法，实现currentRow双向绑定
   */
  @Watch('currentRow')
  watchCurrentRow (val, old) {
    if (val) {
      this.$nextTick(() => setTimeout(this.$refs.table.setCurrentRow(val), 0))
    } else {
      this.$nextTick(() => setTimeout(this.$refs.table.setCurrentRow(), 0))
    }
  }
  currentChange (row) {
    if (row) {
      this.$emit('update:currentRow', row)
    }
  }
  select (rows, row) {
    this.$emit('update:selectedRows', rows)
  }
  // 多选的时候，让点击行的时候，也能选中和取消选中行
  rowClick (row) {
    if (this.multi) {
      const index = this.selectedRows.findIndex((item) => item[this.rowKey] === row[this.rowKey])
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
  toggleRowSelection (rows) {
    rows.forEach((row) => {
      this.$refs.table.toggleRowSelection(row, true)
    })
  }
  isShowTooltip (column) {
    if (column.showOverflowTooltip === undefined) {
      if (column.btns || column.renderCell || column.formatter) {
        return false
      }
      return true
    }
    return column.showOverflowTooltip
  }
}
</script>

<style lang="scss" scoped>
</style>
