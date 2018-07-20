<!--Created by 熊超超 on 2018/6/11.-->
<template>
  <div class="crud h bg-white" flex="">
    <div flex="dir:top" class="left b-r" flex-box="0">
      <div flex-box="0" class="p-10 b-b f-b" flex="box:last">
        <span>可选组件</span>
      </div>
      <draggable v-model="controls" :options="{group: {name: 'g', pull: 'clone', put: false}, sort: false}">
        <div v-for="item in controls" :key="item.type" class="item p-h-10" flex="cross:center">
          <cc-icon :name="item.type" size="18"></cc-icon><span class="m-l-10">{{item.label}}</span>
        </div>
      </draggable>
    </div>

    <div flex="dir:top" class="content b-r" flex-box="1">
      <div flex-box="0" class="p-10 b-b f-b" flex="box:last">
        <span>表单预览</span>
        <cc-icon name="delete" @click="delItem" size="20" :class="['cp', {'c-danger': selectIndex >= 0}]"/>
      </div>
      <el-form ref="form" :model="model" flex-box="1" class="form m-10" flex="dir: top" label-width="100px">
        <draggable v-model="items" :options="{group: {name: 'g'}, filter:'.tips'}" felx-box="1" @add="add" class="form-item-draggable">
          <template v-if="items.length">
            <cc-form-item no-verify @click.native="selectIndex = index" :class="['draggable-item', {'select': selectIndex === index}]"
                          :model="model" :item="item" :key="index"  v-for="(item, index) in items"></cc-form-item>
          </template>
          <div v-else class="tips c-info" flex="cross:center main:center">
            <div flex="dir:top cross:center" class="m-b-100 p-b-100">
              <cc-icon name="drag" size="50"></cc-icon>
              <span class="m-t-30">从左边拖动组件到这里</span></div>
          </div>
        </draggable>
      </el-form>
    </div>
    <div flex-box="0" class="props" flex="dir:top box:last">
      <div class="collapses">
        <el-collapse v-model="activeNames" class="right">
          <el-collapse-item title="属性" name="1">
            <form-item-props @change="changeOptions" :type="pageModel.type" :item="selectItem"></form-item-props>
          </el-collapse-item>
          <el-collapse-item title="选择项" name="2">
            <form-item-options @change="changeOptions" :item="selectItem" :needOptions="needOptions"></form-item-options>
          </el-collapse-item>
          <el-collapse-item title="校验" name="3">
            <form-item-verify @change="changeOptions" :item="selectItem"></form-item-verify>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="p-10 b-t">
        <cc-form :data="formObj" full-width/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import {Action} from 'vuex-class'
  import draggable from 'vuedraggable'
  import CcFormItem from '@bc/CcFromItem.vue'
  import FormItemProps from '../fragment/FormItemProps.vue'
  import FormItemOptions from '../fragment/FormItemOptions.vue'
  import FormItemVerify from '../fragment/FormItemVerify.vue'
  import {optionsDefaultData} from '../assets/utils'
  import {FormItemTypeEnum} from '../../../assets/utils/enuns'

  @Component({components: {draggable, CcFormItem, FormItemProps, FormItemOptions, FormItemVerify}})
  export default class CreateCrud extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    @Action('getPage') public getPage: (id: string) => Promise<ActionReturn>
    @Action('savePage') public savePage: (page: Page) => Promise<ActionReturn>
    /*vue-data*/
    public controls: any = [
      {type: 'text', label: '文本框'},
      {type: 'select', label: '选择框'},
      {type: 'date', label: '日期选择器'},
      {type: 'daterange', label: '日期范围'},
      {type: 'datetime', label: '日期时间'},
      {type: 'datetimerange', label: '日期时间范围'},
      {type: 'timeselect', label: '下拉时间选择'},
      {type: 'timerange', label: '下拉时间范围'},
      {type: 'switch', label: '开关'},
      {type: 'radio', label: '单选组'},
      {type: 'radiobutton', label: '单选按钮组'},
      {type: 'checkbox', label: '多选组'},
      {type: 'checkboxbutton', label: '多选按钮组'},
      {type: 'cascader', label: '级联选择器'},
      {type: 'number', label: '计数器'},
      {type: 'slider', label: '滑块'},
      {type: 'rate', label: '评分'},
      {type: 'table', label: '表格选择器'},
      {type: 'tree', label: '树选择器'},
      {type: 'icon', label: '图标选择器'},
      {type: 'color', label: '颜色选择器'},
      {type: 'dialog', label: '弹窗选择器'},
    ]
    public model: any = {}
    public items: any[] = []
    public activeNames: string[] = ['1', '2', '3']
    public selectIndex: number = -1
    public pageModel: Page = {type: 1, name: '', pageDesc: '', pageName: ''}
    /*vue-compute*/
    get typeName() {
      return this.$c.PageTypeK[this.pageModel.type || 1]
    }
    get formObj(): FormObject {
      return {
        model: this.pageModel,
        items: [
          {label: `类型`, prop: 'type', type: FormItemTypeEnum.radio, options: this.$c.options.pageType},
          {label: `${this.typeName}名称`, prop: 'pageName', type: FormItemTypeEnum.text, placeholder: '', verify: {required: true}},
          {label: '实体名称', prop: 'name', type: FormItemTypeEnum.text, placeholder: '表单对应的model对象名称', verify: {required: true}},
          {label: `${this.typeName}描述`, prop: 'pageDesc', type: FormItemTypeEnum.textarea, placeholder: ''},
        ],
        btns: [
          {action: 'save', cb: this.save},
        ],
      }
    }
    get selectItem(): any {
      if (this.selectIndex >= 0) {
        const item = this.items[this.selectIndex]
        item.multiSelect = item.multiSelect || false
        return item
      }
      return undefined
    }
    get needOptions() {
      return this.selectItem ? ['select', 'checkbox', 'radio', 'checkboxbutton', 'radiobutton', 'cascader', 'table', 'tree', 'dialog']
        .includes(this.selectItem.type) : false
    }
    /*vue-watch*/
    @Watch('$route')
    public routeChange() {
      this.initPage()
    }
    /*vue-lifecycle*/
    public created() {
      this.initPage()
    }
    public async initPage() {
      if (this.$route.query['id']) {
        const {data} = await this.getPage(this.$route.query['id'])
        if (data) {
          const {value, ...pageModel} = data
          this.pageModel = pageModel as Page
          const valueObj = JSON.parse(value)
          if (this.pageModel.type === this.$c.PageTypeV.页面) {
            valueObj.items = valueObj.items.map((item: any) => {
              const temp: any = {}
              const formProps = JSON.parse(JSON.stringify(item.formProps))
              delete temp.formProps
              const {tableProps, ...other} = item
              return {...other, ...formProps, ...tableProps}
            })
          }
          this.items = valueObj.items
        }
      }
    }
    /*vue-method*/
    // 删除已经添加的表单项
    public delItem() {
      if (this.selectIndex >= 0) {
        const item = this.items[this.selectIndex]
        delete this.model[item.prop]
        this.items.splice(this.selectIndex, 1)
        this.selectIndex = -1
      }
    }
    // 当添加到字段列表的时候触发，增加prop属性，特殊组件要初始化一些options
    public add(evt: any) {
      const prop = 'p' + Math.floor(Math.random() * 1000000)
      const item: any = {...this.controls[evt.oldIndex]}
      item.prop = prop
      // item.options = optionsDefaultData(item.type)
      item.target = ['editForm']
      this.items.splice(evt.newIndex, 1, item)
    }
    public changeOptions() {
      this.items.splice(this.selectIndex, 1, JSON.parse(JSON.stringify(this.selectItem)))
    }
    public async save() {
      // model名首字母转大写
      this.formObj.model.name = this.formObj.model.name.substr(0, 1).toUpperCase() +  this.formObj.model.name.substr(1)
      // 要删除propsStr
      const items: FormItem[] = this.items.map((item: FormItem) => {
        const temp: FormItem = JSON.parse(JSON.stringify(item))
        delete temp.propsStr
        if (this.pageModel.type === this.$c.PageTypeV.表单) {
          delete temp.target
          delete temp.formProps
          delete temp.tableProps
        } else {
          if (temp.target.includes('table')) {
            temp.tableProps = {}
            temp.tableProps.width = temp.width
            temp.tableProps.formatFun = temp.formatFun
            delete temp.width
            delete temp.formatFun
          }
          temp.formProps = {
            type: temp.type,
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
          name: this.formObj.model.name,
          model: {},
          items,
        }
      } else {
        value = {
          title: this.pageModel.pageName,
          name:  this.pageModel.name,
          items,
          searchForm: {
            model: {},
          },
          editForm: {
            model: {},
          },
          table: {
            rows: [],
          },
          needQuery: true,
        }
      }

      this.pageModel.value = JSON.stringify(value)
      console.log(value)
      const {error} = await this.savePage(this.pageModel)
      if (!error) {
        this.$utils.message('保存成功！')
        this.$utils.closeTab('/baseData/pageList')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .crud{
    height: calc(100% - 20px);
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
      width: 320px;
    }
    .form > div{
      width: 100%;
      position: relative;
      .tips{
        width: 100%;
        height: 100%;
        position: absolute;
        cursor: auto;
        top: 0;
        >div{
          cursor: auto;
        }
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
      /deep/.el-collapse{
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
