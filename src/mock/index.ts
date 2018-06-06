/**
 * Created by 熊超超 on 2017/12/4.
 */
// mock的写法参照 http://mockjs.com

import Mock from 'mockjs'

const optinonMaps: any = {
  status: [
    {
      label: '启用',
      value: 1,
    },
    {
      label: '禁用',
      value: 0,
    },
  ],
  sex: [
    {
      label: '男',
      value: 1,
    },
    {
      label: '女',
      value: 0,
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
        icon: 'add',
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
        icon: 'add',
        url: '/demo',
        children: [
          {
            id: '31',
            name: '表单示例',
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
    resources: [],
  }
  if (user.userName === 'admin') {
    user.roles = '管理员'
    auth.menus.unshift(...[{
      id: '1',
      name: '系统管理',
      icon: 'menu',
      url: '/system',
      children: [{
        id: '11',
        icon: 'user',
        name: '用户管理',
        url: '/system/user',
      }],
    }])
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
Mock.mock(new RegExp('/system/searchUser'), {
  data: {
    'total': 108,
    'list|10': [{
      'id|+1': 1,
      'userName': '用户@id',
      'tel': '124555222',
      'sex|1': [0, 1],
      'status|1': [0, 1],
    }],
  },
  ...common(),
})
// CRUD
Mock.mock(new RegExp('/system/getCrud'), {
  data: {
    title: '用户管理',
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
    editForm: {
      model: {},
      items: [
        {
          label: '姓名',
          prop: 'userName',
          type: 'text',
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
    editNeedQuery: true,
  },
  ...common(),
})
// 获取选择类型表单组件的选项
Mock.mock(new RegExp('/system/getOptions'), (option: any) => {
  const type = option.url.substring(option.url.indexOf('?query=') + 7)
  return {
    data: optinonMaps[type],
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
