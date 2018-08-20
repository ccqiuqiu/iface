<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-form :data="searchForm" class="p-t-10 div p-h-10" is-search :show-message="false" @search="getData"></cc-form>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center" v-if="type === 'crud'">
        <span flex-box="1" class="f-16">{{data.title || ''}}</span>
        <cc-button v-auth="this.page.addUrl || '/page/save' + data.name" icon="add" text="添加" @click="onAdd"/>
        <cc-button v-auth="this.page.updateUrl || '/page/save' + data.name" icon="edit" text="修改" @click="onEdit"/>
        <cc-button v-auth="this.page.viewUrl || '/page/view' + data.name" icon="view" text="查看" @click="onView"/>
        <cc-button v-auth="this.page.delUrl || '/page/del' + data.name" icon="delete" text="删除" @click="onDel"/>
      </div>
      <cc-table ref="table" v-bind="data.table.props" :rows="data.table.rows" :columns="columns" v-loading="loading"
                :row-key="rowKey"
                :multiSelect="multi"
                @single-click="$emit('rowClick')"
                :selected-rows.sync="selectedRows"
                :current-row.sync="currentRow">
      </cc-table>
      <el-pagination class="m-t-16 a-c" background
                     @current-change="pageNumChange" @size-change="pageSizeChange"
                     :layout='layout' :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import {Action} from 'vuex-class'
import CrudUtils from '../assets/utils/crudUtils.jsx'
import CcCrudView from './CcCrudView.vue'

@Component
export default class CcCrud extends Vue {
  /* vue-props */
  @Prop() data
  @Prop({default: () => ({})}) page
  @Prop(Boolean) multiSelect
  @Prop({default: 'crud'}) type // 类型，目前支持crud和dialog，主要控制一些样式差异
  @Prop({type: [Array, Object]}) value // 用于dialog时，需要绑定value，crud时不需要
  /* vue-vuex */
  @Action formAction
  @Action formRequest
  /* vue-data */
  total = 0 // 总条数
  loading = false
  pageNum = 1 // 当前页
  pageSize = 10 // 每页显示条数
  defaultModel = {...this.editForm.model} // 保存一份原始数据的拷贝，用于新增的时候清空model
  selectedRows = []
  currentRow = null
  /* vue-compute */
  get searchForm () {
    if (this.data.searchForm) {
      this.data.searchForm.name = this.data.searchForm.name || this.data.name
      if (!this.data.searchForm.items) {
        this.data.searchForm.items = this.getItems('searchForm')
      }
      return this.data.searchForm
    }
    return {}
  }
  get editForm () {
    if (this.type === 'crud') {
      if (this.data.editForm) {
        this.data.editForm.name = this.data.editForm.name || this.data.name
        if (!this.data.editForm.items) {
          this.data.editForm.items = this.getItems('editForm')
        }
        return this.data.editForm
      }
    }
    return {}
  }
  // 处理一些特殊的列，主要是传递formatFun或者renderFun的列，一般用于后端返回的json
  // 因为formatter和renderCell必须是function，而后端只能返回字符串，
  // 所以折中的办法是后端传方法名，前端通过方法名找到对应的方法。这种情况需要前后端配合才能完成相应的业务
  get columns () {
    if (!this.data.table.columns) {
      this.data.table.columns = this.getItems('table')
    }
    this.data.table.columns.forEach((c) => {
      const prop = c.prop
      if (CrudUtils[prop + 'Render']) {
        c.renderCell = CrudUtils[prop + 'Render'].format
      } else if (CrudUtils[prop + 'Format']) {
        c.formatter = CrudUtils[prop + 'Format'].format
      }
    })
    return this.data.table.columns
  }
  get viewFields () {
    return this.getItems('view')
  }
  get rowKey () {
    return this.data.table.props ? (this.data.table.props.rowKey || 'id') : 'id'
  }
  get multi () {
    return this.multiSelect
  }
  // 查询类表单的查询url，一般在action=search的按钮上面配置
  get searchUrl () {
    return this.page.searchUrl || 'search' + this.data.name
  }
  // 分页组件的样式
  get layout () {
    return this.type === 'crud' ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'
  }
  /* vue-watch */
  @Watch('currentRow')
  currentRowChange (val) {
    if (!this.multi && val) {
      this.$emit('input', val)
    }
  }
  @Watch('selectedRows')
  selectedRowsChange (val) {
    if (this.multi) {
      this.$emit('input', val)
    }
  }
  @Watch('data', {immediate: true})
  dataChange () {
    this.init()
    this.getData()
  }
  /* vue-lifecycle */
  /* vue-method */
  init () {
    if (this.value) {
      if (this.multi) {
        this.selectedRows = this.value
      } else {
        this.currentRow = this.value.length ? this.value[0] : null
      }
    }
  }
  // 查询数据
  async getData () {
    if (this.searchUrl) {
      this.loading = true
      const params = {...this.searchForm.model, pageNum: this.pageNum, pageSize: this.pageSize}
      const {data} = await this.formAction({url: this.searchUrl, params})
      this.loading = false
      if (data) {
        this.data.table.rows = data.rows
        this.total = data.total
        if (this.value) {
          if (this.multi) {
            this.selectedRows.forEach((row, index) => {
              const newRow = data.rows.find((row2) => row[this.rowKey] === row2[this.rowKey])
              if (newRow) {
                this.selectedRows.splice(index, 1, newRow)
              }
            })
          } else {
            if (this.currentRow) {
              const newRow = data.rows.find((row) => row[this.rowKey] === this.currentRow[this.rowKey])
              if (newRow) {
                this.currentRow = newRow
              }
            }
          }
        }
      }
    }
  }
  // pageNum改变的时候的事件
  pageNumChange (pageNum) {
    this.pageNum = pageNum
    this.getData()
  }
  // pageSize改变的时候的事件
  pageSizeChange (pageSize) {
    this.pageSize = pageSize
    this.getData()
  }
  // 点击添加按钮
  onAdd (edit) {
    if (edit) {
      this.editForm.model = {...this.currentRow}
    } else {
      this.editForm.model = {...this.defaultModel}
    }
    const url = edit ? (this.page.getUrl || this.getActionUrl('get')) : ''
    this.$utils.dialog(`${edit ? '修改' : '新增'}`, (h) =>
      <cc-form data={this.editForm} addUrl={this.page.addUrl} updateUrl={this.page.updateUrl} onSave={this.saved} url={url}></cc-form>)
  }
  // 点击编辑按钮
  onEdit () {
    if (!this.currentRow) {
      this.$utils.message('请选择一行', this.$c.MessageType.warning)
      return
    }
    this.onAdd(true)
  }
  // 点击删除按钮
  async onDel () {
    if (!this.currentRow) {
      this.$utils.message('请选择一行', this.$c.MessageType.warning)
      return
    }
    const re = await this.$utils.confirm('确定要删除这条数据吗？')
    if (re) {
      this.loading = true
      const {error} = await this.formRequest(this.page.delUrl || this.getActionUrl('del'))
      this.loading = false
      if (!error) {
        this.$utils.message('删除成功')
        this.getData()
      }
    }
  }
  // 点击查看按钮
  onView () {
    if (!this.currentRow) {
      this.$utils.message('请选择一行', this.$c.MessageType.warning)
      return
    }
    const url = this.page.viewUrl || this.getActionUrl('view')
    this.$utils.dialog('查看', (h) =>
      <CcCrudView data={this.currentRow} fields={this.viewFields} url={url}></CcCrudView>, {showBtn: true})
  }
  // 保存完成
  async saved (re) {
    if (!re.error) {
      this.$utils.message('保存成功')
      this.$utils.hideDialog()
      this.getData()
    }
  }
  getActionUrl (action) {
    if (this.currentRow) {
      return action + this.data.name + '/' + this.currentRow[this.rowKey]
    }
    return ''
  }
  getItems (val) {
    return this.data.items ? this.data.items.filter((item) => item.target.includes(val))
      .map((item) => {
        const {tableProps, formProps, target, ...props} = {...item}
        let otherProps = {}
        if (val === 'table' || val === 'view') {
          otherProps = {...(tableProps || {})}
          otherProps.formProps = formProps
        } else {
          otherProps = formProps || {}
        }
        if (val === 'searchForm' || val === 'view') {
          delete otherProps.verify
        }
        return {...props, ...otherProps}
      }) : []
  }
}
</script>

<style lang="scss" scoped>
</style>
