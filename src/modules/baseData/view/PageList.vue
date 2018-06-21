<!--Created by 熊超超 on 2018/6/21.-->
<template>
  <div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">页面和表单{{mixinValue}}</span>
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
      <el-pagination class="m-t-16 a-c" background
           :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { mixins } from 'vue-class-component'
  import {Action} from 'vuex-class'
  import {PageMixin} from '../../../assets/utils/mixins'

  @Component
  export default class PageList extends mixins(PageMixin) {
    /*vue-props*/
    /*vue-vuex*/
    @Action('pageList') private pageList: (params: {pageNum: number, pageSize: number}) => Promise<ActionReturn>
    /*vue-data*/
    private columns: TableColumn[] = [
      {prop: 'id', label: '编号'},
      {prop: 'userName', label: '名称'},
      {prop: 'sex', label: '性别',
        formatter: (row: any, column: any, cellValue: number) => {
          return this.$c.SexK[cellValue]
        },
      },
    ]
    private rows: User[] = []
    private total: number = 0
    private selectedRows: User[] = []
    private currentRow: User = {}
    private loading: boolean = false
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    private created() {
      this.getData()
    }
    /*vue-method*/
    private async getData() {
      this.loading = true
      const {data} = await this.pageList({pageNum: 1, pageSize: 1})
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