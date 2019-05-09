<!--Created by 熊超超 on 2018/7/9.-->
<template>
  <div>
    <el-card shadow="never" class="p" v-loading="loading">
      <div slot="header" data-flex="cross:center">
        <span data-flex-box="1">{{pageTitle}}</span>
        <cc-button v-auth="'addMenu'" icon="add" text="添加" @click="onAdd"/>
        <cc-button v-auth="'delMenu'" icon="delete" text="删除" @click="onDel"/>
      </div>
      <div data-flex="box:first">
        <div class="left">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="m-b-20"></el-input>
          <el-tree ref="tree" :data="data" :props="{children: 'children', label: 'name'}" default-expand-all
                   :filter-node-method="filterNode" highlight-current node-key="id"
                   draggable @node-drop="nodeDrop" :allow-drop="allowDrop"
                   @current-change="changeSelected" :default-expanded-keys="expandedKeys"></el-tree>
        </div>
        <div>
          <cc-form-dynamic v-if="selected" ref="form" :model="selected" form-code="menu" :before-save="beforeSave" @save="saved"></cc-form-dynamic>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BaseMixin } from '../../../assets/utils/mixins'
import { Action } from 'vuex-class'

export default @Component({ mixins: [BaseMixin] }) class MenuTree extends Vue {
  /* vue-props */
  /* vue-vuex */
  @Action menuTree
  @Action delMenu
  @Action sortMenu
  /* vue-data */
  data = []
  filterText = ''
  selected = null
  expandedKeys = []
  /* vue-compute */
  /* vue-watch */
  @Watch('filterText')
  filterTextChange (val) {
    this.$refs.tree.filter(val)
  }
  /* vue-lifecycle */
  created () {
    this.initData()
  }
  /* vue-method */
  async initData () {
    const { data } = await this.menuTree()
    if (data) {
      this.data = data
      if (this.selected) {
        this.$nextTick(() => this.$refs.tree.setCurrentKey(this.selected.id))
      }
    }
  }
  filterNode (value, data) {
    if (!value) {
      return true
    }
    return data.name.indexOf(value) !== -1
  }
  changeSelected (menu) {
    const clone = { ...menu }
    delete clone['children']
    this.selected = clone
    if (this.$refs.form) {
      this.$refs.form.forceUpdate()
    }
  }
  beforeSave () {
    if (this.selected.id && this.selected.id === this.selected.parentId) {
      this.$utils.message('上级不能是自己！', this.$c.MessageType.error)
      return false
    }
    return true
  }
  saved (re) {
    if (re.data) {
      this.$utils.message('保存成功！')
      this.selected = re.data
      this.initData()
    }
  }
  onAdd () {
    if (!this.selected) {
      this.selected = { parentId: null, name: '', url: '', icon: '' }
    } else {
      this.selected = { parentId: this.selected.id, name: '', url: '', icon: '' }
    }
    if (this.$refs.form) {
      this.$refs.form.forceUpdate()
    }
  }
  async onDel () {
    if (!this.selected) {
      this.$utils.message('请选择一行', this.$c.MessageType.warning)
      return
    }
    const re = await this.$utils.confirm('确定要删除这条数据吗？')
    if (re) {
      this.loading = true
      const { error } = await this.delMenu(this.selected.id)
      this.loading = false
      if (!error) {
        this.$refs.tree.setCurrentKey(null)
        this.selected = null
        this.$utils.message('删除成功')
        this.initData()
      }
    }
  }
  // 判断是否可以拖动
  allowDrop (node, targetNode, location) {
    // 有子节点的，只能拖动到一级节点的前后
    if (node.data.children && node.data.children.length && !targetNode.data.parentId && location !== 'inner') {
      return true
    }
    // 没有子节点的，除了二级节点的里面，其他位置都可以拖动
    if (node.data.children.length === 0 && (!targetNode.data.parentId || location !== 'inner')) {
      return true
    }
    return false
  }
  // 拖动成功后
  async nodeDrop (node, targetNode, location) {
    this.loading = true
    // 修改一下parentId，防止后面的拖动出现问题
    if (location === 'inner') {
      node.data.parentId = targetNode.data.id
    } else {
      node.data.parentId = targetNode.data.parentId
    }
    const { data } = await this.sortMenu({ sourceId: node.data.id, targetId: targetNode.data.id, location })
    this.loading = false
    if (data) {
      this.$utils.message('修改顺序成功！')
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
