<!--Created by 熊超超 on 2018/5/18.-->
<template>
  <div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">用户列表</span>
        <cc-button v-auth="['addUser']" icon="add" text="添加" @click="onAdd"/>
        <cc-button icon="edit" text="修改" @click="onEdit"/>
        <cc-button icon="delete" text="删除" @click="onDel"/>
        <cc-button icon="multi" text="多选" @click="multiSelect = !multiSelect"/>
      </div>
      <cc-table :rows="users" :multi-select="multiSelect"
                :columns="columns"
                :selected-rows.sync="selectedRows"
                :current-row.sync="currentRow"></cc-table>

      <el-pagination class="m-t-16 a-c"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="jsx">
import {Component, Vue} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import EditUser from './EditUser.vue'

@Component
export default class Users extends Vue {
  /* vue-props */
  /* vue-vuex */
  @Action userList
  @Action delUser
  /* data */
  multiSelect = false
  columns = [
    {prop: 'id', label: '编号'},
    {prop: 'userName', label: '名称'},
    {prop: 'sex',
      label: '性别',
      formatter: (row, column, cellValue) => {
        return this.$c.SexK[cellValue]
      }
    },
    {prop: 'tel', label: '电话'},
    {prop: 'status',
      label: '状态',
      renderCell: (h, row) => <el-tag size='small' type={row.status === this.$c.StatusV.禁用 ? 'info' : ''}>{this.$c.StatusK[row.status]}</el-tag>
    }
  ]
  users = []
  selectedRows = []
  currentRow = {}
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.load()
  }
  /* vue-method */
  // 获取列表数据
  async load () {
    const {data} = await this.userList()
    if (data) {
      this.users = data.list
      // this.selectedRows = [this.users[0]]
      // this.currentRow = this.users[0]
    }
  }
  // 点击添加按钮
  onAdd (edit) {
    console.log(111)
    const user = edit ? {...this.currentRow} : undefined
    this.$dialog(`${edit ? '修改' : '新增'}用户`, (h) => <EditUser user={user} onRefresh={this.load}></EditUser>)
  }
  // 点击编辑按钮
  onEdit () {
    this.onAdd(true)
  }
  // 点击删除按钮
  async onDel () {
    const re = await this.$confirm('确定要删除此用户吗？')
    if (re) {
      const {error} = await this.delUser(this.currentRow.id)
      if (!error) {
        this.$message('删除成功')
        this.load()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
