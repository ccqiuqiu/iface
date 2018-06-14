<!--Created by 熊超超 on 2018/6/11.-->
<template>
  <div class="crud h bg-white" flex="cross:stretch">
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
    <div flex="dir:top" class="content b-r" flex-box="0">
      <div flex-box="0" class="p-10 b-b f-b" flex="box:last">
        <span>表单项</span>
        <cc-icon name="delete" @click="delItem" :class="['cp', {'c-danger': selectIndex >= 0}]"/>
      </div>
      <el-form ref="form" :model="model" flex-box="1" class="form m-10" flex="dir: top" label-width="100px">
        <draggable v-model="items" :options="{group: {name: 'g'}, filter:'.tips'}" felx-box="1" @add="add" class="form-item-draggable">
          <template v-if="items.length">
            <cc-form-item @click.native="selectIndex = index" :class="['draggable-item', {'select': selectIndex === index}]"
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
    <div flex-box="1" flex="dir:top box:last">
      <el-collapse v-model="activeNames" class="right">
        <el-collapse-item title="属性" name="1">
          <form-item-props :item="selectItem"></form-item-props>
        </el-collapse-item>
        <el-collapse-item title="选择项" name="2">
          <form-item-options :item="selectItem"></form-item-options>
        </el-collapse-item>
        <el-collapse-item title="校验" name="3">
          <div>3</div>
        </el-collapse-item>
      </el-collapse>
      <div class="p-10 a-r">
        <cc-button icon="save" text="保存"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import draggable from 'vuedraggable'
  import CcFormItem from '@bc/CcFromItem.vue'
  import FormItemProps from '../fragment/FormItemProps.vue'
  import FormItemOptions from '../fragment/FormItemOptions.vue'


  @Component({components: {draggable, CcFormItem, FormItemProps, FormItemOptions}})
  export default class CreateCrud extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    private controls: any = [
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
      {type: 'dialog', label: '弹窗选择器'},
    ]
    private model: any = {}
    private items: any[] = []
    private activeNames: string[] = ['1', '2', '3']
    private selectIndex: number = -1
    /*vue-compute*/
    get selectItem() {
      return this.selectIndex >= 0 ? this.items[this.selectIndex] : undefined
    }
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
    // 删除已经添加的表单项
    private delItem() {
      if (this.selectIndex >= 0) {
        const item = this.items[this.selectIndex]
        delete this.model[item.prop]
        this.items.splice(this.selectIndex, 1)
        this.selectIndex = -1
      }
    }
    // 当添加到字段列表的时候触发，增加prop属性，特殊组件要初始化一些options
    private add(evt: any) {
      const prop = 'p' + Math.floor(Math.random() * 1000000)
      const item: any = {...this.controls[evt.oldIndex]}
      item.prop = prop
      if (['select', 'radio', 'radiobutton', 'checkbox', 'checkboxbutton'].includes(item.type)) {
        item.options = [
          {label: '选项1', value: 1},
          {label: '选项2', value: 2},
        ]
      } else if (item.type === 'cascader') {
        item.options = [
          {
            value: 1,
            label: '广东省',
            children: [{
              value: 2,
              label: '广州市',
              children: [
                {
                  value: 1,
                  label: '天河区',
                },
                {
                  value: 2,
                  label: '番禺区',
                },
              ],
            }],
          },
          {
            value: 2,
            label: '湖北省',
            children: [
              {
                value: 1,
                label: '武汉市',
              },
              {
                value: 2,
                label: '仙桃市',
              },
            ],
          },
        ]
      } else if (item.type === 'table') {
        item.props = {
          valueField: 'id',
          labelField: 'userName',
        }
        item.options = {
          columns: [
            {prop: 'id', label: '编号'},
            {prop: 'userName', label: '名称'},
          ],
          rows: [
            {id: 1, userName: '用户1'},
            {id: 2, userName: '用户2'},
          ],
        }
      } else if (item.type === 'tree') {
        item.options = [
          {
            label: '一级1',
            id: 1,
            children: [
              {
                label: '二级1-1',
                id: 11,
              },
            ],
          },
          {
            label: '二级2',
            id: 2,
            children: [
              {
                label: '二级2-1',
                id: 21,
              },
            ],
          },
        ]
      }
      this.items.splice(evt.newIndex, 1, item)
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars";
  .crud{
    height: calc(100% - 20px);

    .left{
      width: 160px;

      .item{
        height: 32px;
        cursor: move;
      }
      .item:hover{
        background-color: rgba($color-info, 0.2);
      }
    }
    .content{
      width: 400px;
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
      }
    }
  }
</style>