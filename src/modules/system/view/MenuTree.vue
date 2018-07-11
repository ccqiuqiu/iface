<!--Created by 熊超超 on 2018/7/9.-->
<template>
  <el-card shadow="never" class="p" v-loading="loading">
    <div slot="header" flex="cross:center">
      <span flex-box="1">{{pageTitle}}</span>
      <cc-button v-auth="'addMenu'" icon="add" text="添加" @click="onAdd"/>
      <cc-button v-auth="'delMenu'" icon="delete" text="删除" @click="onDel"/>
    </div>
    <div flex="box:first">
      <div class="left">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="m-b-20"></el-input>
        <el-tree ref="tree" :data="data" :props="{children: 'children', label: 'name'}" default-expand-all
                 :filter-node-method="filterNode" highlight-current node-key="id"
                 @current-change="changeSelected" :default-expanded-keys="expandedKeys"></el-tree>
      </div>
      <div>
        <cc-form-dynamic v-if="selected" ref="form" :model="selected" :form-id="3" :before-save="beforeSave" @save="saved"></cc-form-dynamic>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import {BaseMixin} from '@utils/mixins'
  import {Action} from 'vuex-class'

  @Component({mixins: [BaseMixin]})
  export default class MenuTree extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action public menuTree: () => Promise<ActionReturn>
    @Action public delMenu: (id: number) => Promise<ActionReturn>
    /*vue-data*/
    public data: any[] = []
    public filterText: string = ''
    public selected: any = null
    public expandedKeys: any[] = []
    /*vue-compute*/
    /*vue-watch*/
    @Watch('filterText')
    public filterTextChange(val: string) {
      (this.$refs.tree as Vue).filter(val)
    }
    /*vue-lifecycle*/
    public created() {
      this.initData()
    }
    /*vue-method*/
    public async initData() {
      const {data} = await this.menuTree()
      if (data) {
        this.data = data
        if (this.selected) {
          this.$nextTick(() => (this.$refs.tree as Vue).setCurrentKey(this.selected.id))
        }
      }
    }
    public filterNode(value: string, data: any) {
      if (!value) {
        return true
      }
      return data.name.indexOf(value) !== -1
    }
    public changeSelected(menu: Menu) {
      const clone = {...menu}
      delete clone.children
      this.selected = clone
      if (this.$refs.form) {
        (this.$refs.form as Vue).forceUpdate()
      }
    }
    public beforeSave() {
      if (this.selected.id && this.selected.id === this.selected.parentId) {
        this.$utils.message('上级不能是自己！', 'error')
        return false
      }
      return true
    }
    public saved(re: any) {
      if (re.data) {
        this.$utils.message('保存成功！')
        this.selected = re.data
        this.initData()
      }
    }
    public onAdd() {
      if (!this.selected) {
        this.selected = {parentId: null, name: '', url: '', icon: ''}
      } else {
        this.selected = {parentId: this.selected.id, name: '', url: '', icon: ''}
      }
      if (this.$refs.form) {
        (this.$refs.form as Vue).forceUpdate()
      }
    }
    public async onDel() {
      if (!this.selected) {
        this.$utils.message('请选择一行', 'warning')
        return
      }
      const re = await this.$utils.confirm('确定要删除这条数据吗？')
      if (re) {
        this.loading = true
        const{error} = await this.delMenu(this.selected.id)
        this.loading = false
        if (!error) {
          (this.$refs.tree as Vue).setCurrentKey(null)
          this.selected = null
          this.$utils.message('删除成功')
          this.initData()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .left{
    width: 200px;
    margin-right: 20px;
  }
</style>
