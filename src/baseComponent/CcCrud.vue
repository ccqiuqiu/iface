<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-form :data="searchForm" class="p-t-10 div p-h-10" is-search :show-message="false" @search="getData"></cc-form>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center" v-if="type === 'crud'">
        <span flex-box="1">{{data.title || ''}}</span>
        <cc-button v-auth="['add' + data.name]" icon="add" text="添加" @click="onAdd"/>
        <cc-button v-auth="['edit' + data.name]" icon="edit" text="修改" @click="onEdit"/>
        <cc-button v-auth="['view' + data.name]" icon="view" text="查看" @click="onView"/>
        <cc-button v-auth="['del' + data.name]" icon="delete" text="删除" @click="onDel"/>
      </div>
      <cc-table ref="table" v-bind="data.table.props" :rows="data.table.rows" :columns="columns" v-loading="loading"
                :row-key="rowKey"
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

<script lang="tsx">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import CrudUtils from '@utils/CrudUtils.tsx'
  import CcCrudView from '@bc/CcCrudView.vue'

  @Component
  export default class CcCrud extends Vue {
    /*vue-props*/
    @Prop() private data: CRUDObject
    @Prop({default: 'crud'}) private type: string // 类型，目前支持crud和dialog，主要控制一些样式差异
    @Prop({type: [Array, Object]}) private value: any | any[] // 用于dialog时，需要绑定value，crud时不需要
    /*vue-vuex*/
    @Action('formAction')
    private formAction: (params: {url: string, params: any}) => Promise<ActionReturn>
    @Action('requestUrl')
    private requestUrl: (url: string) => Promise<ActionReturn>
    /*vue-data*/
    private total: number = 0 // 总条数
    private loading: boolean = false
    private pageNum: number = 1  // 当前页
    private pageSize: number = 10 // 每页显示条数
    private defaultModel: any = {...this.editForm.model} // 保存一份原始数据的拷贝，用于新增的时候清空model
    private selectedRows: any[] = []
    private currentRow: any = null
    /*vue-compute*/
    get searchForm(): FormObject | any {
      if (this.data.searchForm) {
        this.data.searchForm.name = this.data.searchForm.name || this.data.name
        if (!this.data.searchForm.items) {
          this.data.searchForm.items = this.getItems('searchForm') as FormItem[]
        }
        return this.data.searchForm
      }
      return {}
    }
    get editForm(): FormObject | any {
      if (this.type === 'crud') {
        if (this.data.editForm) {
          this.data.editForm.name = this.data.editForm.name || this.data.name
          if (!this.data.editForm.items) {
            this.data.editForm.items = this.getItems('editForm') as FormItem[]
          }
          return this.data.editForm
        }
      }
      return {}
    }
    // 处理一些特殊的列，主要是传递formatFun或者renderFun的列，一般用于后端返回的json
    // 因为formatter和renderCell必须是function，而后端只能返回字符串，
    // 所以折中的办法是后端传方法名，前端通过方法名找到对应的方法。这种情况需要前后端配合才能完成相应的业务
    get columns() {
      if (!this.data.table.columns) {
        this.data.table.columns = this.getItems('table') as TableColumn[]
      }
      this.data.table.columns.forEach((c: TableColumn) => {
        if (c.formatFun) {
          c.formatter = CrudUtils[c.formatFun + 'Format']
        }
        if (c.renderFun) {
          c.renderCell = CrudUtils[c.renderFun + 'Render']
        }
      })
      return this.data.table.columns
    }
    get rowKey() {
      return this.data.table.props && this.data.table.props.rowKey || 'id'
    }
    get multi() {
      return !!this.data.table.columns.find((c: TableColumn) => c.type === 'selection')
    }
    // 查询类表单的查询url，一般在action=search的按钮上面配置
    get searchUrl(): string {
      return 'search' + this.data.name
    }
    // 分页组件的样式
    get layout() {
      return this.type === 'crud' ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'
    }
    /*vue-watch*/
    @Watch('currentRow')
    private currentRowChange(val: any) {
      if (!this.multi && val) {
        this.$emit('input', val)
      }
    }
    @Watch('selectedRows')
    private selectedRowsChange(val: any) {
      if (this.multi) {
        this.$emit('input', val)
      }
    }
    /*vue-lifecycle*/
    private created() {
      this.init()
      // 搜索表单，默认立即执行搜索按钮
      this.getData()
    }
    /*vue-method*/
    private init() {
      if (this.value) {
        if (this.multi) {
          this.selectedRows = this.value
        } else {
          this.currentRow = this.value.length ? this.value[0] : null
        }
      }
    }
    // 查询数据
    private async getData() {
      if (this.searchUrl) {
        this.loading = true
        const params = {...this.searchForm.model, pageNum: this.pageNum, pageSize: this.pageSize}
        const {data} = await this.formAction({url: this.searchUrl, params})
        this.loading = false
        if (data) {
          this.data.table.rows = data.list
          this.total = data.total
          if (this.value) {
            if (this.multi) {
              this.selectedRows.forEach((row: any, index: number) => {
                const newRow = data.list.find((row2: any) => row[this.rowKey] === row2[this.rowKey])
                if (newRow) {
                  this.selectedRows.splice(index, 1, newRow)
                }
              })
            } else {
              if (this.currentRow) {
                const newRow = data.list.find((row: any) => row[this.rowKey] === this.currentRow[this.rowKey])
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
    private pageNumChange(pageNum: number) {
      this.pageNum = pageNum
      this.getData()
    }
    // pageSize改变的时候的事件
    private pageSizeChange(pageSize: number) {
      this.pageSize = pageSize
      this.getData()
    }
    // 点击添加按钮
    private onAdd(edit: boolean) {
      if (edit) {
        this.editForm.model = {...this.currentRow}
      } else {
        this.editForm.model = {...this.defaultModel}
      }
      const url = this.data.needQuery && edit ? this.getActionUrl('get') : ''
      this.$utils.dialog(`${edit ? '修改' : '新增'}`, (h: any) =>
        <cc-form data={this.editForm} onSave={this.saved} url={url}></cc-form>)
    }
    // 点击编辑按钮
    private onEdit() {
      if (!this.currentRow) {
        this.$utils.message('请选择一行', 'warning')
        return
      }
      this.onAdd(true)
    }
    // 点击删除按钮
    private async onDel() {
      if (!this.currentRow) {
        this.$utils.message('请选择一行', 'warning')
        return
      }
      const re = await this.$utils.confirm('确定要删除这条数据吗？')
      if (re) {
        this.loading = true
        const{error} = await this.requestUrl(this.getActionUrl('del'))
        this.loading = false
        if (!error) {
          this.$utils.message('删除成功')
          this.getData()
        }
      }
    }
    // 点击查看按钮
    private onView() {
      if (!this.currentRow) {
        this.$utils.message('请选择一行', 'warning')
        return
      }
      const url = this.data.needQuery ? this.getActionUrl('view') : ''
      this.$utils.dialog('查看', (h: any) =>
        <CcCrudView data={this.currentRow} fields={this.editForm.items} url={url}></CcCrudView>, {showBtn: true})
    }
    // 保存完成
    private async saved(error: any) {
      if (!error) {
        this.$utils.message('保存成功')
        this.$utils.hideDialog()
        this.getData()
      }
    }
    private getActionUrl(action: string) {
      if (this.currentRow) {
        return action + this.data.name + '/' + this.currentRow[this.rowKey]
      }
      return ''
    }
    private getItems(val: string): FormItem[] | TableColumn[] {
      return this.data.items ? this.data.items.filter((item: CRUDItem) => item.target.includes(val))
        .map((item: CRUDItem) => {
          const {tableProps, formProps, target, ...props} = {...item}
          let otherProps: any = {}
          if (val === 'table') {
            otherProps = tableProps || {}
          } else {
            otherProps = formProps || {}
            if (val === 'searchForm') {
              delete otherProps.verify
            }
          }
          return {...props, ...otherProps}
        }) : []
    }
  }
</script>

<style lang="scss" scoped>
</style>