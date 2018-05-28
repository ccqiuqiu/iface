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
  return {
    data: {
      token: '123'
    },
    ...common((user.userName === 'cc' && user.password === '123456') ? false : '登录失败')
  }
})

Mock.mock(new RegExp('/getAuth'), option => {
  const data = {
    menus: [{
      'id': '2',
      'name': '图表示例',
      'icon': 'add',
      'url': '/demo'
    }],
    resources: []
  }
  const body = JSON.parse(option.body)
  if (body.token === '123') {
    data.menus.unshift(...[{
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
  }
  return {
    data,...common()
  }
})

// Mock.mock(new RegExp('/system/userList'), {
//   'data|10': [{
//     'id|+1': 1,
//     'userName': '用户1',
//     'tel': '124555222',
//     'sex|1': [0, 1],
//     'status|1': [0, 1]
//   }],
//   ...common()
// })
