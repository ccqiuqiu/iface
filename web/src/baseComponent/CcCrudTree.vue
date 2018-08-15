<!--Created by 熊超超 on 2018/8/14.-->
<template>
  <div>
    <el-card shadow="never" class="p" v-loading="loading">
      <div slot="header" flex="cross:center">
        <span flex-box="1">{{pageTitle}}</span>
        <cc-button v-auth="'addMenu'" icon="add" text="添加" @click="onAdd"/>
        <cc-button v-auth="'delMenu'" icon="delete" text="删除" @click="onDel"/>
      </div>
      <div flex="box:first">
        <div class="left">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="m-b-20"></el-input>
          <el-tree ref="tree" :data="treeData" :props="treeProps" default-expand-all
                   :filter-node-method="filterNode" highlight-current node-key="id"
                   :draggable="draggable" @node-drop="nodeDrop" :allow-drop="allowDrop"
                   @current-change="changeSelected" :default-expanded-keys="expandedKeys"></el-tree>
        </div>
        <div>
          <cc-form ref="form" class="full-width" v-if="currentRow && show" :data="editForm" :addUrl="page.addUrl" :updateUrl="page.updateUrl"
                   @save="this.saved" :url="url"></cc-form>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
  import {BaseMixin} from '@utils/mixins'
  import {Action} from 'vuex-class'
  import {MessageTypeEnum} from '@utils/enums'

  @Component({mixins: [BaseMixin]})
  export default class CcCrudTree extends Vue {
    /*vue-props*/
    @Prop() public data: CRUDObject
    @Prop() public page: Page
    /*vue-vuex*/
    @Action public formAction: (params: {url: string, params: any}) => Promise<ActionReturn>
    @Action public formRequest: (url: string) => Promise<ActionReturn>
    @Action public sortMenu: (params: {sourceId: string, targetId: string, location: string}) => Promise<ActionReturn>
    /*vue-data*/
    public filterText: string = ''
    public currentRow: any = null
    public expandedKeys: any[] = []
    public treeData: any[] = []
    public edit: boolean = false
    public show: boolean = true
    public treeProps: any = {children: 'children', label: 'name'}
    /*vue-compute*/
    get draggable() {
      return this.$route.params['code'] === 'menu'
    }
    get editForm(): FormObject | any {
      if (this.data.editForm) {
        this.data.editForm.name = this.data.editForm.name || this.data.name
        if (!this.data.editForm.items) {
          this.data.editForm.items = this.getItems('editForm') as FormItem[]
        }
        return this.data.editForm
      }
      return {}
    }
    // 查询类表单的查询url，一般在action=search的按钮上面配置
    get searchUrl(): string {
      return this.page.searchUrl || 'search' + this.data.name
    }
    get url() {
      return this.edit ? (this.page.getUrl || this.getActionUrl('get')) : ''
    }
    get rowKey() {
      return this.data.table.props && this.data.table.props.rowKey || 'id'
    }
    /*vue-watch*/
    @Watch('filterText')
    public filterTextChange(val: string) {
      (this.$refs.tree as Vue).filter(val)
    }
    @Watch('data', {immediate: true})
    public dataChange() {
      this.getData()
    }
    /*vue-lifecycle*/
    /*vue-method*/
    public async getData() {
      if (this.searchUrl) {
        this.loading = true
        const {data} = await this.formAction({url: this.searchUrl, params: {}})
        this.loading = false
        if (data) {
          this.treeData = data['rows'] || data
          if (data.props) {
            this.treeProps = data.props
          }
        }
      }
    }

    public filterNode(value: string, data: any) {
      if (!value) {
        return true
      }
      return data.name.indexOf(value) !== -1
    }

    public changeSelected(node: any) {
      this.edit = true
      const clone = {...node}
      this.currentRow = clone
      this.editForm.model = this.currentRow
      this.forceUpdate()
    }

    public saved(re: any) {
      if (re.data) {
        this.$utils.message('保存成功！')
        this.selected = re.data
        this.getData()
        this.show = false
      }
    }

    public onAdd() {
      this.edit = false
      if (!this.currentRow) {
        this.currentRow = {}
      } else {
        this.currentRow = {parentId: this.currentRow[this.rowKey]}
      }
      this.editForm.model = this.currentRow
      this.forceUpdate()
    }
    public async onDel() {
      if (!this.currentRow) {
        this.$utils.message('请选择一行', MessageTypeEnum.warning)
        return
      }
      const re = await this.$utils.confirm('确定要删除这条数据吗？')
      if (re) {
        this.loading = true
        const{error} = await this.formRequest(this.page.delUrl || this.getActionUrl('del'))
        this.loading = false
        if (!error) {
          this.$utils.message('删除成功')
          this.show = false
          this.getData()
        }
      }
    }
    public forceUpdate() {
      this.show = false
      this.$nextTick(() => this.show = true)
    }
    public getActionUrl(action: string) {
      if (this.currentRow) {
        return action + this.data.name + '/' + this.currentRow[this.rowKey]
      }
      return ''
    }
    public getItems(val: string): FormItem[] | TableColumn[] {
      return this.data.items ? this.data.items.filter((item: CRUDItem) => item.target.includes(val))
        .map((item: CRUDItem) => {
          const {tableProps, formProps, target, ...props} = {...item}
          let otherProps: any = {}
          if (val === 'table' || val === 'view') {
            otherProps = {...(tableProps || {})}
            otherProps.formProps = formProps
          } else {
            otherProps = formProps || {}
          }
          if (val === 'searchForm' || val === 'view') {
            delete otherProps.verify
          }
          return {...props, ...otherProps}
        }) : []
    }
    // 判断是否可以拖动
    public allowDrop(node: any, targetNode: any, location: string) {
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
    public async nodeDrop(node: any, targetNode: any, location: string) {
      this.loading = true
      // 修改一下parentId，防止后面的拖动出现问题
      if (location === 'inner') {
        node.data.parentId = targetNode.data.id
      } else {
        node.data.parentId = targetNode.data.parentId
      }
      const {data} = await this.sortMenu({sourceId: node.data.id, targetId: targetNode.data.id, location})
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