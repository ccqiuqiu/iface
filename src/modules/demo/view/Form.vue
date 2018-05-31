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
        table: [1],
      },
      items: [
        {
          label: '文本框',
          field: 'name',
          type: 'text',
        },
        {
          label: '选择框',
          field: 'area',
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
          field: 'area2',
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
          field: 'daterange',
          type: 'daterange',
          props: {rangeSeparator: '至'},
        },
        {
          label: '多选',
          field: 'type',
          type: 'checkbox',
          options: [
            {
              label: '美食/餐厅线上活动',
              value: 1,
            },
            {
              label: '地推活动',
              value: 2,
            },
            {
              label: '线下主题活动',
              value: 3,
            },
            {
              label: '单纯品牌噱头',
              value: 4,
            },
          ],
        },
        {
          label: '多选-按钮',
          field: 'type',
          type: 'checkboxbutton',
          options: [
            {
              label: '美食/餐厅线上活动',
              value: 1,
            },
            {
              label: '地推活动',
              value: 2,
            },
            {
              label: '线下主题活动',
              value: 3,
            },
            {
              label: '单纯品牌噱头',
              value: 4,
            },
          ],
        },
        {
          label: '单选',
          field: 'resource',
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
          field: 'resource',
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
          field: 'date',
          type: 'date',
        },
        {
          label: '日期时间',
          field: 'datetime',
          type: 'datetime',
        },
        {
          label: '时间选择',
          field: 'timeselect',
          type: 'timeselect',
        },
        {
          label: '时间面板',
          field: 'time',
          type: 'time',
        },
        {
          label: '时间范围',
          field: 'timerange',
          type: 'timerange',
        },
        {
          label: '级联选择',
          field: 'cascader',
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
          field: 'number',
          type: 'number',
        },
        {
          label: '滑块',
          field: 'slider',
          type: 'slider',
        },
        {
          label: '开关',
          field: 'switch',
          type: 'switch',
        },
        {
          label: '评分',
          field: 'rate',
          type: 'rate',
        },
        {
          label: '表格',
          field: 'table',
          type: 'table',
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
      ],
      btns: [
        {
          action: 'add',
          text: '保存',
          url: '',
        },
        {
          action: 'reset',
          text: '重置',
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