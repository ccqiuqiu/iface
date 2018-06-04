<!--Created by 熊超超 on 2018/6/4.-->
<template>
  <div>
    <cc-form :data="data.form" class="p-t-10 div p-h-10" :show-message="false"></cc-form>
    <el-card shadow="never" class="p">
      <!--<div slot="header" flex="cross:center">-->
        <!--<span flex-box="1">用户列表</span>-->
        <!--<cc-button v-auth="['addUser']" icon="add" text="添加" @click="onAdd"/>-->
        <!--<cc-button icon="edit" text="修改" @click="onEdit"/>-->
        <!--<cc-button icon="delete" text="删除" @click="onDel"/>-->
      <!--</div>-->
      <cc-table :rows="data.table.rows" :columns="data.table.columns">
      </cc-table>
      <el-pagination class="m-t-16 a-c"
                     background
                     layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </el-card>
    <div class="action">
      <el-button type="primary">选择</el-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class CcCrud extends Vue {
    /*vue-props*/
    @Prop() private data: any
    /*vue-vuex*/
    /*vue-data*/
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    private created() {
      console.log(typeof this.data.table)
    }
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>