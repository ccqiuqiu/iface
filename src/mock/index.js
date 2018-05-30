/**
 * Created by 熊超超 on 2017/12/4.
 */
// mock的写法参照 http://mockjs.com

import Mock from 'mockjs'

const common = (message) => {
  const obj = {
    success: !message
  }
  if (message) {
    obj.error = {
      message
    }
  }
  return obj
}

// 登录
Mock.mock(new RegExp('/login'), option => {
  const user = JSON.parse(option.body)
  const success = user.userName === 'admin' && user.password === '123456' || user.userName === 'test' && user.password === '123456'
  // 权限
  const auth = {
    menus: [{
      'id': '2',
      'name': '图表示例',
      'icon': 'add',
      'url': '/demo',
      'children': [{
        'id': '21',
        'icon': 'user',
        'name': '折线图',
        'url': '/chart/line',
      }]
    }],
    resources: []
  }
  if (user.userName === 'admin') {
    user.roles = '管理员'
    auth.menus.unshift(...[{
      'id': '1',
      'name': '系统管理',
      'icon': 'menu',
      'url': '/system',
      'children': [{
        'id': '11',
        'icon': 'user',
        'name': '用户管理',
        'url': '/system/user',
      }]
    }])
  } else {
    user.roles = '普通用户'
  }
  return {
    data: {
      user: user,
      auth: auth,
      token: 'klsJGFLKjlslgsakldjflaksjldjslkrh835498sdf=4etgsdk'
    },
    ...common(success ? '' : '登录失败')
  }
})

// 用户列表
Mock.mock(new RegExp('/system/userList'), {
  'data|10': [{
    'id|+1': 1,
    'userName': '用户1',
    'tel': '124555222',
    'sex|1': [0, 1],
    'status|1': [0, 1]
  }],
  ...common()
})
