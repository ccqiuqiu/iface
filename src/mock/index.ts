/**
 * Created by 熊超超 on 2017/12/4.
 */
// mock的写法参照 http://mockjs.com

import Mock from 'mockjs'

function getQueryString(url: string, name: string) {
  const reg: RegExp = new RegExp('(.*/?)&?' + name + '=([^&]*)(&|$)', 'i')
  const r: any = url.match(reg)
  if (r) { return unescape(r[2]) }
  return ''
}

Mock.setup({
  timeout: '300-600',
})

const optinonMaps: any = {
  status: [
    {
      label: '启用',
      value: 1,
    },
    {
      label: '禁用',
      value: 2,
    },
  ],
  sex: [
    {
      label: '男',
      value: 1,
    },
    {
      label: '女',
      value: 2,
    },
  ],
  checkBoxDemo: [
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
}

const common = (message?: any) => {
  const obj: any = {
    success: !message,
  }
  if (message) {
    obj.error = {
      message,
    }
  }
  return obj
}

// 登录
Mock.mock(new RegExp('/login'), (option: any) => {
  const user = JSON.parse(option.body)
  const success = user.userName === 'admin' && user.password === '123456' || user.userName === 'test' && user.password === '123456'
  // 权限
  const auth = {
    menus: [
      {
        id: '2',
        name: '图表',
        icon: 'chart',
        url: '/demo',
        children: [
          {
            id: '21',
            icon: 'line',
            name: '折线图',
            url: '/chart/line',
          },
          {
            id: '22',
            icon: 'histogram',
            name: '柱状图',
            url: '/chart/histogram',
          },
          {
            id: '23',
            icon: 'pie',
            name: '饼图',
            url: '/chart/pie',
          },
          {
            id: '24',
            icon: 'ring',
            name: '环形图',
            url: '/chart/ring',
          },
          {
            id: '25',
            icon: 'chart-toggle',
            name: '图表切换',
            url: '/chart/toggle',
          },
        ],
      },
      {
        id: '3',
        name: '表单',
        icon: 'form',
        url: '/demo',
        children: [
          {
            id: '31',
            name: '表单组件',
            icon: 'form',
            url: '/form/form',
          },
          {
            id: '32',
            name: 'CRUD示例',
            icon: 'crud',
            url: '/form/crud',
          },
        ],
      },
    ],
    resources: ['addUser', 'editUser'],
  }
  if (user.userName === 'admin') {
    user.roles = '管理员'
    auth.menus.unshift(...[{
      id: '1',
      name: '系统管理',
      icon: 'system',
      url: '/system',
      children: [
        {
          id: '11',
          icon: 'user',
          name: '用户管理',
          url: '/system/user',
        },
        {
          id: '16',
          name: '表单生成',
          icon: 'form',
          url: '/system/createCrud/form',
        },
      ],
    }])
    auth.resources = ['all']
  } else {
    user.roles = '普通用户'
  }
  return {
    data: {
      user,
      auth,
      token: 'klsJGFLKjlslgsakldjflaksjldjslkrh835498sdf=4etgsdk',
    },
    ...common(success ? '' : '登录失败'),
  }
})

// 用户列表
Mock.mock(new RegExp('/system/userList'), (option: any) => {
  const body = JSON.parse(option.body)
  body.pageNum = body.pageNum || 1
  return {
    data: Mock.mock({
      'total': 108,
      'rows|10': [{
        'id|+1': (body.pageNum - 1) * 10 + 1,
        'userName': '用户@id',
        'tel': '124555222',
        'sex|1': [0, 1],
        'status|1': [0, 1],
      }],
    }),
    ...common(),
  }
})
// CRUD
Mock.mock(new RegExp('/baseData/getCrud_'), {
  data: {
    title: '用户管理',
    name: 'User',
    searchForm: {
      model: {},
      items: [
        {
          label: '姓名',
          prop: 'userName',
          type: 'text',
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          options: 'status',
        },
      ],
    },
    editForm: {
      model: {},
      items: [
        {
          label: '姓名',
          prop: 'userName',
          type: 'text',
          verify: {
            number: true,
          },
        },
        {
          label: '性别',
          prop: 'sex',
          type: 'select',
          options: 'sex',
        },
        {
          label: '电话',
          prop: 'tel',
          type: 'text',
          verify: {
            phone: true,
            canBeEmpty: '',
          },
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          options: 'status',
        },
        {
          label: '测试弹窗',
          prop: 'dialog',
          type: 'dialog',
          props: {
            valueField: 'id',
            labelField: 'userName',
          },
          verify: {},
          dialog: {
            name: 'User',
            searchForm: {
              model: {},
              props: {
                type: 'search',
              },
              items: [
                {
                  label: '姓名',
                  prop: 'userName',
                  type: 'text',
                },
                {
                  label: '状态',
                  prop: 'status',
                  type: 'select',
                  options: 'status',
                },
              ],
            },
            table: {
              columns: [
                {prop: 'id', label: '编号'},
                {prop: 'userName', label: '名称'},
                {prop: 'sex', label: '性别', formatFun: 'sex'},
                {prop: 'tel', label: '电话'},
                {prop: 'status', label: '状态', renderFun: 'status'},
              ],
              rows: [],
            },
            needQuery: true,
          },
        },
      ],
    },
    table: {
      columns: [
        {prop: 'id', label: '编号'},
        {prop: 'userName', label: '名称'},
        {prop: 'sex', label: '性别', formatFun: 'sex'},
        {prop: 'tel', label: '电话'},
        {prop: 'status', label: '状态', renderFun: 'status'},
      ],
      rows: [],
    },
    needQuery: true,
  },
  ...common(),
})

Mock.mock(new RegExp('/baseData/getPage'), {
  data: {
    title: '用户管理',
    name: 'User',
    items: [
      {
        label: '编号',
        prop: 'id',
        target: ['table'],
      },
      {
        label: '姓名',
        prop: 'userName',
        target: ['table', 'searchForm', 'editForm'],
        formProps: {
          type: 'text',
          verify: {
            number: true,
          },
        },
      },
      {
        label: '性别',
        prop: 'sex',
        target: ['table', 'editForm'],
        formProps: {
          type: 'select',
          options: 'sex',
        },
        tableProps: {
          formatFun: 'sex',
        },
      },
      {
        label: '电话',
        prop: 'tel',
        target: ['table', 'editForm'],
        formProps: {
          type: 'text',
          verify: {
            phone: true,
            canBeEmpty: '',
          },
        },
      },
      {
        label: '状态',
        prop: 'status',
        target: ['table', 'searchForm', 'editForm'],
        formProps: {
          type: 'select',
          options: 'status',
        },
        tableProps: {
          renderFun: 'status',
        },
      },
      {
        label: '测试弹窗',
        prop: 'dialog',
        target: ['editForm'],
        formProps: {
          type: 'dialog',
          props: {
            valueField: 'id',
            labelField: 'userName',
            verify: {},
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
                  label: '姓名',
                  prop: 'userName',
                  type: 'text',
                },
                {
                  label: '状态',
                  prop: 'status',
                  type: 'select',
                  options: 'status',
                },
              ],
            },
            table: {
              columns: [
                {prop: 'id', label: '编号'},
                {prop: 'userName', label: '名称'},
                {prop: 'sex', label: '性别', formatFun: 'sex'},
                {prop: 'tel', label: '电话'},
                {prop: 'status', label: '状态', renderFun: 'status'},
              ],
              rows: [],
            },
            needQuery: true,
          },
        },
      },
    ],
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
  },
  ...common(),
})
// 获取选择类型表单组件的选项
Mock.mock(new RegExp('/baseData/getOptions'), (option: any) => {
  const code = getQueryString(option.url, 'code')
  return {
    data: optinonMaps[code],
    ...common(),
  }
})
//
Mock.mock(new RegExp('/system/saveUser'), (option: any) => {
  const user = JSON.parse(option.body)
  console.log(user)
  return {
    data: {},
    ...common(),
  }
})
// 获取用户详情
Mock.mock(new RegExp('/system/getUser/'), {
  data: {
    'id': 1,
    'userName': '用户@id',
    'tel': '124555222',
    'sex|1': [0, 1],
    'status|1': [0, 1],
    'dialog': {
      id: 1,
      userName: '用户1',
    },
  },
  ...common(),
})
// 获取用户详情
Mock.mock(new RegExp('/system/viewUser/'), {
  data: {
    userName: '用户',
    tel: '124555222',
    sex: '男',
    status: '启用',
    dialog: '用户1,用户2',
  },
  ...common(),
})
// 删除用户
Mock.mock(new RegExp('/system/delUser/'), {
  data: {},
  ...common(),
})
