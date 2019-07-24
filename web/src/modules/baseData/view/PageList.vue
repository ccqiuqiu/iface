<!--Created by 熊超超 on 2018/6/21.-->
<template>
  <div class="div">
    <div class="p-h-10 p-v-6" data-flex="cross:center main:right">
      <cc-button v-auth="'savePage'" icon="add" text="添加" @click="onAdd"/>
      <cc-button v-auth="'savePage'" icon="edit" text="修改" @click="onEdit"/>
      <cc-button v-auth="'delPage'" icon="delete" text="删除" @click="onDel"/>
      <cc-button v-auth="'savePage'" icon="add" text="通过编辑器添加" @click="onAddEditor"/>
    </div>
    <cc-table ref="table" :rows="rows" :columns="columns" v-loading="loading"
              @single-click="$emit('rowClick')"
              :selected-rows.sync="selectedRows"
              :current-row.sync="currentRow">
    </cc-table>
    <el-pagination class="m-t-16 a-c m-b-10" background :layout="layout"
                   @current-change="pageNumChange" @size-change="pageSizeChange"
                   :page-size="pageSize" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { BaseMixin, PageMixin, TabMixin } from '../../../assets/utils/mixins'

export default @Component class PageList extends Mixins(BaseMixin, PageMixin, TabMixin) {
  /* vue-props */
  /* vue-vuex */
  @Action searchPage
  @Action requestUrl
  /* vue-data */
  columns = [
    { prop: 'name', label: '名称', width: '120px' },
    { prop: 'code', label: '编号', width: '120px' },
    { prop: 'resource', label: '资源路径', width: '200px' },
    { prop: 'type',
      label: '类型',
      width: '80px',
      formatter: (row, column, cellValue) => {
        return this.$c.PageTypeK[cellValue]
      },
    },
    { prop: 'remark', label: '描述' }
  ]
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  async getData () {
    this.loading = true
    const { data } = await this.searchPage({ pageNum: this.pageNum, pageSize: this.pageSize })
    this.loading = false
    if (data) {
      this.total = data.total
      this.rows = data.rows || data.records
    }
  }
  onAdd () {
    this.$tab.open('/baseData/createCrud', '添加页面或表单')
  }
  onAddEditor () {
    this.$tab.open('/baseData/pageEditor', '在线编辑页面')
  }
  onEdit () {
    if (!this.currentRow) {
      this.$utils.message('请选择一行', this.$c.MessageType.warning)
      return
    }
    if (this.currentRow.type === this.$c.PageTypeV.代码) {
      this.$tab.open('/baseData/pageEditor?code=' + this.currentRow.code, `修改${this.currentRow.name}`)
    } else {
      this.$tab.open('/baseData/createCrud?code=' + this.currentRow.code, `修改${this.currentRow.name}`)
    }
  }
  async onDel () {
    if (!this.currentRow) {
      this.$utils.message('请选择一行', this.$c.MessageType.warning)
      return
    }
    const re = await this.$utils.confirm('确定要删除这条数据吗？')
    if (re) {
      this.loading = true
      const { error } = await this.$store.dispatch('delPage', this.currentRow.id)
      this.loading = false
      if (!error) {
        this.$utils.message('删除成功')
        this.getData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
