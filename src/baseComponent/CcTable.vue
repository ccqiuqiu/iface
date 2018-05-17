<!--Created by 熊超超 on 2018/5/5.-->
<template>
  <el-table :data="rows">
    <template v-for="(column, index) in columns">
      <el-table-column v-if="column.renderCell" v-bind="column">
        <template slot-scope="scope">
          <compontent :is="{render: (h) => column.renderCell(h, scope.row, scope.$index, scope.column, scope.store)}"></compontent>
        </template>
      </el-table-column>
      <el-table-column v-bind="column" v-else/>
    </template>
  </el-table>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  @Component
  export default class CcTable extends Vue {
    @Prop() private rows: any[]
    @Prop() private columns: TableColumn[]
  }
</script>

<style lang="less" scoped>
</style>
