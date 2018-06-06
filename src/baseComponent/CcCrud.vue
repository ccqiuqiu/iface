<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-form :data="searchForm" class="p-t-10 div p-h-10" is-search :show-message="false" @search="getData"></cc-form>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center" v-if="type === 'crud'">
        <span flex-box="1">{{data.title || ''}}</span>
        <cc-button v-auth="['addUser']" icon="add" text="添加" @click="onAdd"/>
        <cc-button icon="edit" text="修改" @click="onEdit"/>
        <cc-button icon="delete" text="删除" @click="onDel"/>
      </div>
      <cc-table v-bind="data.table.props" :rows="data.table.rows" :columns="columns" v-loading="loading"  :current-row.sync="currentRow">
      </cc-table>
      <el-pagination class="m-t-16 a-c" background
                     @current-change="pageNumChange" @size-change="pageSizeChange"
                     :layout='layout' :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import CrudUtils from '@utils/CrudUtils.tsx'

  @Component
  export default class CcCrud extends Vue {
    /*vue-props*/
    @Prop()
    private data: any
    @Prop({default: 'crud'})
    private type: string // 类型，目前支持crud和dialog，主要控制一些样式差异
    /*vue-vuex*/
    @Action('formAction')
    private formAction: (params: {url: string, params: any}) => Promise<ActionReturn>
    /*vue-data*/
    private total: number = 0 // 总条数
    private loading: boolean = false
    private pageNum: number = 1  // 当前页
    private pageSize: number = 10 // 每页显示条数
    private defaultModel: any = {...this.editForm.model} // 保存一份原始数据的拷贝，用于新增的时候清空model
    private currentRow: any = null
    /*vue-compute*/
    get searchForm() {
      this.data.searchForm.name = this.data.searchForm.name || this.data.name
      return this.data.searchForm
    }
    get editForm() {
      this.data.editForm.name = this.data.editForm.name || this.data.name
      return this.data.editForm
    }
    // 查询类表单的查询url，一般在action=search的按钮上面配置
    get searchUrl(): string {
      return 'search' + this.data.name
    }
    get getUrl(): string {
      if (this.data.editNeedQuery && this.currentRow) {
        const rowKey = this.data.table.props && this.data.table.props.rowKey || 'id'
        return 'get' + this.data.name + '/' + this.currentRow[rowKey]
      }
      return ''
    }
    // 分页组件的样式
    get layout() {
      return this.type === 'crud' ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'
    }
    // 处理一些特殊的列，主要是传递formatFun或者renderFun的列，一般用于后端返回的json
    // 因为formatter和renderCell必须是function，而后端只能返回字符串，
    // 所以折中的办法是后端传方法名，前端通过方法名找到对应的方法。这种情况需要前后端配合才能完成相应的业务
    get columns() {
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
    /*vue-watch*/
    /*vue-lifecycle*/
    private created() {
      // 搜索表单，默认立即执行搜索按钮
      this.getData()
    }
    /*vue-method*/
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
      this.$utils.dialog(`${edit ? '修改' : '新增'}`, (h: any) =>
        <cc-form data={this.editForm} onSave={this.save} url={edit ? this.getUrl : ''}></cc-form>)
    }
    // 点击编辑按钮
    private onEdit() {
      if (!this.currentRow) {
        this.$utils.message('请选择一行', 'error')
        return
      }
      this.onAdd(true)
    }
    // 点击删除按钮
    private async onDel() {
      if (!this.currentRow) {
        this.$utils.message('请选择一行', 'error')
        return
      }
      const re = await this.$utils.confirm('确定要删除这条数据吗？')
      if (re) {
        const{error} = await this.delUser(this.currentRow.id as number)
        if (!error) {
          this.$utils.message('删除成功')
          this.load()
        }
      }
    }
    // 保存
    private async save(url: string) {
      const {error} = await this.formAction({url, params: this.editForm.model})
      if (!error) {
        this.$utils.message('保存成功')
        this.$utils.hideDialog()
        this.getData()
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>