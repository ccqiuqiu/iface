<!--Created by 熊超超 on 2018/5/30.-->
<template>
  <div>
    <div class="tip" flex="box:last cross:center">
      <span class="m-r-30">表单组件，使用json数据描述表单控件，纯数据驱动，简化表单使用方式。支持element-ui的全部表单组件，基本兼容原有api，并额外增加了弹窗选择组件</span>
      <a href="https://v-charts.js.org/#/toggle" target="_blank">查看文档</a>
    </div>
    <el-card shadow="never" class="p">
      <div slot="header" flex="cross:center">
        <span flex-box="1">表单示例</span>
      </div>
      <cc-form :data="formObj"></cc-form>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Form extends Vue {
    /*vue-props*/
    /*vue-vuex*/
    /*vue-data*/
    private formObj: FormObject = {
      model: {
        name: 'eee',
        area: 1,
        area2: [1, 2],
        daterange: ['2018-09-09', '2018-09-20'],
        type: [1, 3],
        resource: 2,
        date: '2018-09-09',
        datetime: '2018-09-09 10:00:00',
        timeselect: '09:30',
        time: '09:08:30',
        timerange: ['09:08:30', '18:30:00'],
        cascader: [1, 2, 1],
        number: 5,
        slider: 30,
        switch: true,
        rate: 3,
        table: 1,
        tree: 11,
        table2: [1],
        tree2: [11],
        icon: 'menu',
        dialog: [
          {
            id: 1,
            userName: '用户1',
          },
        ],
      },
      items: [
        {
          label: '文本框',
          prop: 'name',
          type: 'text',
        },
        {
          label: '选择框',
          prop: 'area',
          type: 'select',
          options: [
            {
              label: '区域一',
              value: 1,
            },
            {
              label: '区域二',
              value: 2,
            },
          ],
        },
        {
          label: '选择框-多选',
          prop: 'area2',
          type: 'select',
          props: {multiple: true},
          options: [
            {
              label: '区域一',
              value: 1,
            },
            {
              label: '区域二',
              value: 2,
            },
          ],
        },
        {
          label: '日期范围',
          prop: 'daterange',
          type: 'daterange',
          props: {rangeSeparator: '至'},
        },
        {
          label: '多选',
          prop: 'type2',
          type: 'checkbox',
          options: 'checkBoxDemo',
        },
        {
          label: '多选-按钮',
          prop: 'type',
          type: 'checkboxbutton',
          options: 'checkBoxDemo',
        },
        {
          label: '单选',
          prop: 'resource',
          type: 'radio',
          options: [
            {
              label: '线上品牌商赞助',
              value: 1,
            },
            {
              label: '线下场地免费',
              value: 2,
            },
          ],
        },
        {
          label: '单选-按钮',
          prop: 'resource2',
          type: 'radiobutton',
          options: [
            {
              label: '线上品牌商赞助',
              value: 1,
            },
            {
              label: '线下场地免费',
              value: 2,
            },
          ],
        },
        {
          label: '日期',
          prop: 'date',
          type: 'date',
        },
        {
          label: '日期时间',
          prop: 'datetime',
          type: 'datetime',
        },
        {
          label: '时间选择',
          prop: 'timeselect',
          type: 'timeselect',
        },
        {
          label: '时间面板',
          prop: 'time',
          type: 'time',
        },
        {
          label: '时间范围',
          prop: 'timerange',
          type: 'timerange',
        },
        {
          label: '级联选择',
          prop: 'cascader',
          type: 'cascader',
          options: [
            {
              value: 1,
              label: '指南',
              children: [{
                value: 2,
                label: '设计原则',
                children: [
                  {
                    value: 1,
                    label: '一致',
                  },
                  {
                    value: 2,
                    label: '反馈',
                  },
                ],
              }],
            },
            {
              value: 2,
              label: '组件',
              children: [
                {
                  value: 1,
                  label: 'input',
                },
                {
                  value: 2,
                  label: 'select',
                },
              ],
            },
          ],
        },
        {
          label: '计数器',
          prop: 'number',
          type: 'number',
        },
        {
          label: '滑块',
          prop: 'slider',
          type: 'slider',
        },
        {
          label: '开关',
          prop: 'switch',
          type: 'switch',
        },
        {
          label: '评分',
          prop: 'rate',
          type: 'rate',
        },
        {
          label: '表格-单选',
          prop: 'table',
          type: 'table',
          props: {
            valueField: 'id',
            labelField: 'userName',
          },
          options: {
            columns: [
              {prop: 'id', label: '编号'},
              {prop: 'userName', label: '名称'},
            ],
            rows: [
              {id: 1, userName: '用户1'},
              {id: 2, userName: '用户2'},
            ],
          },
        },
        {
          label: '表格-多选',
          prop: 'table2',
          type: 'table',
          props: {
            valueField: 'id',
            labelField: 'userName',
          },
          options: {
            columns: [
              {type: 'selection'},
              {prop: 'id', label: '编号'},
              {prop: 'userName', label: '名称'},
            ],
            rows: [
              {id: 1, userName: '用户1'},
              {id: 2, userName: '用户2'},
            ],
          },
        },
        {
          label: '树-单选',
          prop: 'tree',
          type: 'tree',
          options: [
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
          ],
        },
        {
          label: '树-多选',
          prop: 'tree2',
          type: 'tree',
          props: {showCheckbox: true},
          options: [
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
          ],
        },
        {
          label: '图标选择',
          prop: 'icon',
          type: 'icon',
        },
        {
          label: '弹出框',
          prop: 'dialog',
          type: 'dialog',
          props: {
            labelField: 'userName',
          },
          dialog: {
            name: 'User',
            searchForm: {
              model: {},
              props: {
                type: 'search',
              },
              items: [
                {
                  label: '文本框',
                  prop: 'name',
                  type: 'text',
                },
                {
                  label: '文本框2',
                  prop: 'name2',
                  type: 'text',
                },
              ],
              btns: [
                {
                  action: 'search',
                  url: '',
                },
              ],
            },
            table: {
              columns: [
                {type: 'selection'},
                {prop: 'id', label: '编号'},
                {prop: 'userName', label: '名称'},
              ],
              rows: [
                {id: 1, userName: '用户1'},
                {id: 2, userName: '用户2'},
              ],
            },
          },
        },
      ],
      btns: [
        {
          action: 'save',
          url: '',
        },
        {
          action: 'reset',
          url: '',
        },
      ],
    }
    /*vue-compute*/
    /*vue-watch*/
    /*vue-lifecycle*/
    /*vue-method*/
  }
</script>

<style lang="scss" scoped>
</style>