<!--Created by 熊超超 on 2018/5/18.-->
<template>
  <div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">用户列表</span>
        <cc-button v-auth="['addUser']" icon="add" text="添加" @click="onAdd"/>
        <cc-button icon="edit" text="修改" @click="onEdit"/>
        <cc-button icon="delete" text="删除" @click="onDel"/>
      </div>
      <cc-table :rows="users"
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

<script lang="tsx">
  import {Component, Vue} from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import EditUser from './EditUser.vue'

  @Component
  export default class Users extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action private userList: () => Promise<ActionReturn>
    @Action private delUser: (id: number) => Promise<ActionReturn>
    /*vue-data*/
    private columns: TableColumn[] = [
      {prop: 'id', label: '编号'},
      {prop: 'userName', label: '名称'},
      {prop: 'sex', label: '性别',
        formatter: (row: any, column: any, cellValue: number) => {
          return this.$c.SexK[cellValue]
        },
      },
      {prop: 'tel', label: '电话'},
      {prop: 'status', label: '状态',
        renderCell: (h: any, row: any) => <el-tag size='small' type={row.status === this.$c.StatusV.禁用 ? 'info' : ''}>{this.$c.StatusK[row.status]}</el-tag>,
      },
    ]
    private users: User[] = []
    private selectedRows: User[] = []
    private currentRow: User = {}
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    private created() {
      this.load()
    }
    /*vue-method*/
    // 获取列表数据
    private async load() {
      const {data}: any = await this.userList()
      if (data) {
        this.users = data.list
        // this.selectedRows = [this.users[0]]
        // this.currentRow = this.users[0]
      }
    }
    // 点击添加按钮
    private onAdd(edit: boolean) {
      const user = edit ? {...this.currentRow} : undefined
      this.$utils.dialog(`${edit ? '修改' : '新增'}用户`, (h: any) => <EditUser user={user} onRefresh={this.load}></EditUser>)
    }
    // 点击编辑按钮
    private onEdit() {
      this.onAdd(true)
    }
    // 点击删除按钮
    private async onDel() {
      const re = await this.$utils.confirm('确定要删除此用户吗？')
      if (re) {
        const{error} = await this.delUser(this.currentRow.id as number)
        if (!error) {
          this.$utils.message('删除成功')
          this.load()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>