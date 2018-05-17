<!--Created by 熊超超 on 2018/4/24.-->
<template>
  <div>
    <cc-icon name="component"></cc-icon>
    <el-button>默认按钮</el-button>
     <cc-table :rows="rows" :columns="columns"></cc-table>
  </div>
</template>

<script lang="tsx">
  import {Component, Vue} from 'vue-property-decorator'
  import CcTable from '../../../baseComponent/CcTable.vue'

  @Component({components: {CcTable}})
  export default class Home extends Vue {
    private columns: TableColumn[] = [
      {prop: 'id', label: '编号'},
      {
        prop: 'name',
        label: '名称',
        renderCell: (h: any, row: any) => <div>{row.name}</div>,
      },
    ]
    private rows = [
      {id: 1, name: '自定义渲染'},
    ]
  }
</script>

<style lang="less" scoped>
</style>
