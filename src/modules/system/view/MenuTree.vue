<!--Created by 熊超超 on 2018/7/9.-->
<template>
  <el-card shadow="never" class="p">
    <div slot="header" flex="cross:center">
      <span flex-box="1">{{pageTitle}}</span>
    </div>
    <div flex="box:first">
      <div class="left">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="m-b-20"></el-input>
        <el-tree ref="tree" :data="data" :props="{children: 'children', label: 'name'}"
                 :filter-node-method="filterNode" highlight-current node-key="id"
                 @current-change="changeSelected" :default-expanded-keys="expandedKeys"></el-tree>
      </div>
      <div>
        <cc-form-dynamic :model="selected" :form-id="4" :before-save="beforeSave" @save="saved"></cc-form-dynamic>
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
    }
    public beforeSave() {
      if (this.selected.id === this.selected.parentId) {
        this.$utils.message('上级不能是自己！', 'error')
        return false
      }
      return true
    }
    public saved(error: any) {
      if (!error) {
        this.expandedKeys = [this.selected.id]
        this.$utils.message('保存成功！')
        this.initData()
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