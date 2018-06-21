<!--Created by 熊超超 on 2018/6/21.-->
<template>
  <div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">{{pageTitle}}</span>
        <!--<cc-button v-auth="['add' + data.name]" icon="add" text="添加" @click="onAdd"/>-->
        <!--<cc-button v-auth="['edit' + data.name]" icon="edit" text="修改" @click="onEdit"/>-->
        <!--<cc-button v-auth="['view' + data.name]" icon="view" text="查看" @click="onView"/>-->
        <!--<cc-button v-auth="['del' + data.name]" icon="delete" text="删除" @click="onDel"/>-->
      </div>
      <cc-table ref="table" :rows="rows" :columns="columns" v-loading="loading"
                @single-click="$emit('rowClick')"
                :selected-rows.sync="selectedRows"
                :current-row.sync="currentRow">
      </cc-table>
      <el-pagination class="m-t-16 a-c" background :layout="layout"
                     @current-change="pageNumChange" @size-change="pageSizeChange"
                     :page-size="pageSize" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import {BaseMixin, PageMixin} from '../../../assets/utils/mixins'

  @Component({mixins: [BaseMixin, PageMixin]})
  export default class PageList extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action('pageList') private pageList: (params: {pageNum: number, pageSize: number}) => Promise<ActionReturn>
    /*vue-data*/
    private columns: TableColumn[] = [
      {prop: 'id', label: '编号'},
      {prop: 'name', label: '名称'},
    ]
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    private async getData() {
      this.loading = true
      const {data} = await this.pageList({pageNum: this.pageNum, pageSize: this.pageSize})
      this.loading = false
      if (data) {
        this.total = data.total
        this.rows = data.rows
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>