<!--Created by 熊超超 on 2018/8/14.-->
<template>
  <div class="div p-b-10" v-loading="loading">
    <div class="p-10" data-flex="cross:center main:right">
<!--      <span data-flex-box="1">{{pageTitle}}</span>-->
      <cc-button v-auth="'addMenu'" icon="add" text="添加" @click="onAdd"/>
      <cc-button v-auth="'delMenu'" icon="delete" text="删除" @click="onDel"/>
    </div>
    <div data-flex="box:first">
      <div class="left m-h-10 m-b-10">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="m-b-20"></el-input>
        <el-tree ref="tree" :data="treeData" :props="treeProps" default-expand-all
                 :filter-node-method="filterNode" highlight-current node-key="id"
                 :draggable="draggable" @node-drop="nodeDrop" :allow-drop="allowDrop"
                 @current-change="changeSelected" :default-expanded-keys="expandedKeys"></el-tree>
      </div>
      <div class="m-h-10">
        <cc-form ref="form" class="full-width" v-if="currentRow && show" :data="editForm" :save="page.saveUrl"
                 @save="this.saved" :url="url"></cc-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Watch, Prop, Inject } from 'vue-property-decorator'
import { Action } from 'vuex-class'

export default @Component class CcCrudTree extends Vue {
  /* vue-props */
  @Prop() data
  @Prop() page
  /* vue-vuex */
  @Action requestUrl
  @Action sortMenu
  /* vue-data */
  @Inject() params
  filterText = ''
  currentRow = null
  expandedKeys = []
  treeData = []
  edit = false
  show = true
  treeProps = { children: 'children', label: 'name' }
  /* vue-compute */
  get draggable () {
    return this.params && this.params['p1'] === 'menu'
  }
  get editForm () {
    if (this.data.editForm) {
      this.data.editForm.name = this.data.editForm.name || this.data.name
      if (!this.data.editForm.items) {
        this.data.editForm.items = this.getItems('editForm')
      }
      return this.data.editForm
    }
    return {}
  }
  // 查询类表单的查询url，一般在action=search的按钮上面配置
  get searchUrl () {
    return this.page.searchUrl || this.data.name
  }
  get url () {
    return this.edit ? this.getActionUrl('get') : ''
  }
  get rowKey () {
    return this.data.table.props ? (this.data.table.props.rowKey || 'id') : 'id'
  }
  /* vue-watch */
  @Watch('filterText')
  filterTextChange (val) {
    this.$refs.tree.filter(val)
  }
  @Watch('data', { immediate: true })
  dataChange () {
    this.getData()
  }
  /* vue-lifecycle */
  /* vue-method */
  async getData () {
    if (this.searchUrl) {
      this.loading = true
      const { data } = await this.requestUrl({ url: this.searchUrl, params: {} })
      this.loading = false
      if (data) {
        this.treeData = data['rows'] || data
        if (data.props) {
          this.treeProps = data.props
        }
      }
    }
  }

  filterNode (value, data) {
    if (!value) {
      return true
    }
    return data.name.indexOf(value) !== -1
  }

  changeSelected (node) {
    this.edit = true
    const clone = { ...node }
    this.currentRow = clone
    this.editForm.model = this.currentRow
    this.forceUpdate()
  }

  saved (re) {
    if (re.data) {
      this.$utils.message('保存成功！')
      this.selected = re.data
      this.getData()
      this.show = false
    }
  }

  onAdd () {
    this.edit = false
    if (!this.currentRow) {
      this.currentRow = {}
    } else {
      this.currentRow = { parentId: this.currentRow[this.rowKey] }
    }
    this.editForm.model = this.currentRow
    this.forceUpdate()
  }
  async onDel () {
    if (!this.currentRow) {
      this.$utils.message('请选择一行', this.$c.MessageType.warning)
      return
    }
    const re = await this.$utils.confirm('确定要删除这条数据吗？')
    if (re) {
      this.loading = true
      const { error } = await this.requestUrl({ url: this.getActionUrl('del'), method: 'delete' })
      this.loading = false
      if (!error) {
        this.$utils.message('删除成功')
        this.show = false
        this.getData()
      }
    }
  }
  forceUpdate () {
    this.show = false
    this.$nextTick(() => (this.show = true))
  }
  getActionUrl (action) {
    if (this.currentRow) {
      return (this.page[action + 'Url'] || this.data.name) + '/' + this.currentRow[this.rowKey]
    }
    return ''
  }
  getItems (val) {
    return this.data.items ? this.data.items.filter((item) => item.target.includes(val))
      .map((item) => {
        const { tableProps, formProps, target, ...props } = { ...item }
        let otherProps = {}
        if (val === 'table' || val === 'view') {
          otherProps = { ...(tableProps || {}) }
          otherProps.formProps = formProps
        } else {
          otherProps = formProps || {}
        }
        if (val === 'searchForm' || val === 'view') {
          delete otherProps.verify
        }
        return { ...props, ...otherProps }
      }) : []
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
      this.forceUpdate()
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
