<!--Created by 熊超超 on 2018/6/11.-->
<template>
  <div class="crud bg-white full" data-flex="">
    <div data-flex="dir:top" class="left b-r" data-flex-box="0">
      <div data-flex-box="0" class="p-10 b-b f-b" data-flex="box:last">
        <span>可选组件</span>
      </div>
      <draggable v-model="controls" v-bind="{group: {name: 'g', pull: 'clone', put: false}, sort: false}">
        <div v-for="item in controls" :key="item.type" class="item p-h-10" data-flex="cross:center">
          <cc-icon :name="item.type" size="18"></cc-icon><span class="m-l-10">{{item.label}}</span>
        </div>
      </draggable>
    </div>

    <div data-flex="dir:top" class="content b-r" data-flex-box="1">
      <div data-flex-box="0" class="p-10 b-b f-b" data-flex="box:last">
        <span>表单预览</span>
        <cc-icon name="delete" @click="delItem" size="20" :class="['cp', {'c-danger': selectIndex >= 0}]"/>
      </div>
      <el-form ref="form" :model="model" data-flex-box="1" class="form m-10" data-flex="dir:top" label-width="100px">
        <draggable v-model="items" v-bind="{group: {name: 'g'}, filter:'.tips'}" data-flex-box="1" @add="add" class="form-item-draggable">
          <template v-if="items.length">
            <cc-form-item no-verify @click.native="selectIndex = index" :class="['draggable-item', {'select': selectIndex === index}]"
                          :model="model" :item="item" :key="index"  v-for="(item, index) in items"></cc-form-item>
          </template>
        </draggable>
        <div v-if="items.length === 0" class="tips c-info" data-flex="cross:center main:center">
          <div data-flex="dir:top cross:center">
            <cc-icon name="drag" size="50"></cc-icon>
            <span class="m-t-30">从左边拖动组件到这里</span></div>
        </div>
      </el-form>
    </div>
    <div data-flex-box="0" class="props" data-flex="dir:top box:last">
      <div class="collapses">
        <el-collapse v-model="activeNames" class="right" :accordion="false">
          <el-collapse-item title="组件属性" name="1">
            <form-item-props @change="changeOptions" :type="pageModel.type" :item="selectItem"></form-item-props>
          </el-collapse-item>
          <el-collapse-item title="选择数据源" name="2">
            <form-item-options @change="changeOptions" :item="selectItem" :needOptions="needOptions"></form-item-options>
          </el-collapse-item>
          <el-collapse-item title="表单校验" name="3">
            <form-item-verify @change="changeOptions" :item="selectItem"></form-item-verify>
          </el-collapse-item>
          <el-collapse-item title="页面/表单属性" name="4">
            <cc-form ref="form" :data="formObj" full-width/>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="p-10 b-t a-r">
        <cc-button icon="save" text="保存" @click="onSave"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Watch, Mixins } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import draggable from 'vuedraggable'
import CcFormItem from '../../../baseComponent/CcFormItem.vue'
import FormItemProps from '../fragment/FormItemProps.vue'
import FormItemOptions from '../fragment/FormItemOptions.vue'
import FormItemVerify from '../fragment/FormItemVerify.vue'
import { TabMixin } from '../../../assets/utils/mixins'

export default @Component({ components: { draggable, CcFormItem, FormItemProps, FormItemOptions, FormItemVerify } })
class CreateCrud extends Mixins(TabMixin) {
  /* vue-props */
  /* vue-vuex */
  @Action('getPage') getPage
  @Action('savePage') savePage
  /* vue-data */
  controls = [
    { type: 'text', label: '文本框' },
    { type: 'select', label: '选择框' },
    { type: 'date', label: '日期选择器' },
    { type: 'daterange', label: '日期范围' },
    { type: 'datetime', label: '日期时间' },
    { type: 'datetimerange', label: '日期时间范围' },
    { type: 'timeselect', label: '下拉时间选择' },
    { type: 'timerange', label: '下拉时间范围' },
    { type: 'switch', label: '开关' },
    { type: 'radio', label: '单选组' },
    { type: 'radiobutton', label: '单选按钮组' },
    { type: 'checkbox', label: '多选组' },
    { type: 'checkboxbutton', label: '多选按钮组' },
    { type: 'cascader', label: '级联选择器' },
    { type: 'number', label: '计数器' },
    { type: 'slider', label: '滑块' },
    { type: 'rate', label: '评分' },
    { type: 'table', label: '表格选择器' },
    { type: 'tree', label: '树选择器' },
    { type: 'icon', label: '图标选择器' },
    { type: 'color', label: '颜色选择器' },
    { type: 'dialog', label: '弹窗选择器' }
  ]
  model = {}
  items = []
  activeNames = ['1', '4']
  selectIndex = -1
  pageModel = { type: 1, name: '', remark: '', modelName: '' }
  /* vue-compute */
  get typeName () {
    return this.$c.PageTypeK[this.pageModel.type || 1]
  }
  get formObj () {
    return {
      model: this.pageModel,
      items: [
        { label: `类型`, prop: 'type', type: this.$c.FormItemType.select, options: this.$c.options.pageType.filter(item => item.label !== 'CODE'), verify: { required: true } },
        { label: `名称`, prop: 'name', type: this.$c.FormItemType.text, placeholder: '页面名称', verify: { required: true } },
        { label: `代码`, prop: 'code', type: this.$c.FormItemType.text, placeholder: '唯一编码', verify: { required: true } },
        { label: '资源路径', prop: 'resource', type: this.$c.FormItemType.text, placeholder: '模块/资源', verify: { required: true } },
        { label: '搜索URL', prop: 'searchUrl', type: this.$c.FormItemType.text, placeholder: '表格或树的数据接口' },
        { label: '详情URL', prop: 'getUrl', type: this.$c.FormItemType.text, placeholder: '获取详情的接口' },
        { label: '保存URL', prop: 'saveUrl', type: this.$c.FormItemType.text, placeholder: '新增/更新对象的接口' },
        { label: '删除URL', prop: 'delUrl', type: this.$c.FormItemType.text, placeholder: '删除对象的接口' },
        { label: `描述`, prop: 'remark', type: this.$c.FormItemType.textarea, placeholder: '' }
      ],
      btns: []
    }
  }
  get selectItem () {
    if (this.selectIndex >= 0) {
      const item = this.items[this.selectIndex]
      item.multiSelect = item.multiSelect || false
      return item
    }
    return undefined
  }
  get needOptions () {
    return this.selectItem ? ['select', 'checkbox', 'radio', 'checkboxbutton', 'radiobutton', 'cascader', 'table', 'tree', 'dialog']
      .includes(this.selectItem.type) : false
  }
  /* vue-watch */
  @Watch('$route')
  routeChange (val) {
    if (val.name === 'createCrud') {
      this.initPage()
    }
  }
  /* vue-lifecycle */
  created () {
    this.initPage()
  }
  async initPage () {
    const code = this.query.code
    if (code) {
      const { data } = await this.getPage(code)
      if (data) {
        const { value, ...pageModel } = data
        this.pageModel = pageModel
        const valueObj = JSON.parse(value)
        if (this.pageModel.type !== this.$c.PageTypeV.表单) {
          valueObj.items = valueObj.items.map((item) => {
            const temp = {}
            const formProps = JSON.parse(JSON.stringify(item.formProps))
            delete temp.formProps
            const { tableProps, ...other } = item
            return { ...other, ...formProps, ...tableProps }
          })
        }
        this.items = valueObj.items
      }
    }
  }
  /* vue-method */
  // 删除已经添加的表单项
  delItem () {
    if (this.selectIndex >= 0) {
      const item = this.items[this.selectIndex]
      delete this.model[item.prop]
      this.items.splice(this.selectIndex, 1)
      this.selectIndex = -1
    }
  }
  // 当添加到字段列表的时候触发，增加prop属性，特殊组件要初始化一些options
  add (evt) {
    const prop = 'p' + Math.floor(Math.random() * 1000000)
    const item = { ...this.controls[evt.oldIndex] }
    item.prop = prop
    // item.options = optionsDefaultData(item.type)
    item.target = ['editForm']
    this.items.splice(evt.newIndex, 1, item)
  }
  changeOptions () {
    this.items.splice(this.selectIndex, 1, JSON.parse(JSON.stringify(this.selectItem)))
  }
  onSave () {
    this.$refs.form.submit(this.save)
  }
  async save () {
    // model名首字母转大写
    // this.formObj.model.name = this.formObj.model.name.substr(0, 1).toUpperCase() + this.formObj.model.name.substr(1)
    // 要删除propsStr
    const items = this.items.map((item) => {
      const temp = JSON.parse(JSON.stringify(item))
      delete temp.propsStr
      if (this.pageModel.type === this.$c.PageTypeV.表单) {
        delete temp.target
        delete temp.formProps
        delete temp.tableProps
      } else {
        if (temp.target && temp.target.includes('table')) {
          temp.tableProps = {}
          temp.tableProps.width = temp.width
          temp.tableProps.formatFun = temp.formatFun
          delete temp.width
          delete temp.formatFun
        }
        temp.formProps = {
          type: temp.type
        }
        if (temp.props) {
          temp.formProps.props = temp.props
        }
        if (temp.options) {
          temp.formProps.options = temp.options
        }
        delete temp.type
        delete temp.props
        delete temp.options
      }
      this.$utils.delEmptyProp(temp)
      return temp
    })
    let value = {}
    if (this.pageModel.type === this.$c.PageTypeV.表单) {
      value = {
        name: this.pageModel.resource,
        model: {},
        items
      }
    } else {
      value = {
        title: this.pageModel.name,
        name: this.pageModel.resource,
        items,
        searchForm: {
          model: {}
        },
        editForm: {
          model: {}
        },
        table: {
          rows: []
        }
      }
    }

    this.pageModel.value = JSON.stringify(value)
    const { error } = await this.savePage(this.pageModel)
    if (!error) {
      this.$utils.message('保存成功！')
      this.$tab.close('/baseData/pageList', this.$c.RefreshType.更新数据)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .crud{
    height: 100%;
    overflow: hidden;
    .left{
      width: 160px;
      overflow-y: auto;
      .item{
        height: 32px;
        cursor: move;
      }
      .item:hover{
        background-color: rgba($color-info, 0.2);
      }
    }
    .content{
      overflow-y: auto;
    }
    .collapses{
      overflow-y: auto;
    }
    .props{
      width: 400px;
    }
    .form{
      position: relative;

      .tips{
        width: 100%;
        position: absolute !important;
        cursor: auto;
        top: 50%;
        transform: translate3d(0, -70%, 0);
        >div{
          cursor: auto;
        }
      }

      .form-item-draggable{
        width: 100%;
        overflow-y: auto;
      }
      .draggable-item{
        cursor: move;
        width: calc(100% - 10px);
        margin-bottom: 0!important;
        padding: 5px;
        /deep/>*{
          cursor: move;
        }
        &.select{
          background-color: rgba($color-warning, 0.2);
        }
      }
      /deep/ .sortable-ghost{
        height: 32px;
        background-color: rgba($color-info, 0.2);
        >*{
          opacity: 0.5;
        }
      }
    }
    .sortable-drag{
      background-color: rgba($color-primary, 0.2);
      /deep/>*{
        opacity: 0.6;
      }
    }
    .right{
      &.el-collapse/deep/{
        border-top: 0;
        .el-collapse-item__header, .el-collapse-item__wrap{
          padding: 0 10px;
        }
        .el-collapse-item:last-child{
          .el-collapse-item__header, .el-collapse-item__wrap{
            border-bottom: 0;
          }
        }
      }
    }
  }
  /deep/ .el-form .action{
    display: flex;
    justify-content: flex-end;
  }
</style>
