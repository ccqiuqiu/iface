<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-form :data="data.form" class="p-t-10 div p-h-10" :show-message="false" @search="getData"></cc-form>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center" v-if="type === 'crud'">
        <span flex-box="1">{{data.title || ''}}</span>
        <cc-button v-auth="['addUser']" icon="add" text="添加" @click="onAdd"/>
        <cc-button icon="edit" text="修改" @click="onEdit"/>
        <cc-button icon="delete" text="删除" @click="onDel"/>
      </div>
      <cc-table :rows="data.table.rows" :columns="columns" v-loading="loading">
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
    @Prop() private data: any
    @Prop({default: 'crud'}) private type: string
    /*vue-vuex*/
    @Action('formAction') private formAction: (params: {url: string, params: any}) => Promise<ActionReturn>
    /*vue-data*/
    private total: number = 0
    private loading: boolean = false
    private pageNum: number = 1
    private pageSize: number = 10
    /*vue-compute*/
    get searchUrl(): string {
      const searchBtn = this.data.form.btns.find((btn: FormBtn) => btn.action === 'search')
      if (searchBtn) {
        return searchBtn.url
      }
      return ''
    }
    get layout() {
      return this.type === 'crud' ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'
    }
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
    private async getData() {
      this.loading = true
      const params = {...this.data.form.model, pageNum: this.pageNum, pageSize: this.pageSize}
      const {data} = await this.formAction({url: this.searchUrl, params})
      this.loading = false
      if (data) {
        this.data.table.rows = data.list
        this.total = data.total
      }
    }
    private pageNumChange(pageNum: number) {
      this.pageNum = pageNum
      this.getData()
    }
    private pageSizeChange(pageSize: number) {
      this.pageSize = pageSize
      this.getData()
    }
    private onAdd() {
      return null
    }
    private onEdit() {
      return null
    }
    private onDel() {
      return null
    }
  }
</script>

<style lang="scss" scoped>
</style>