/**
 * Created by 熊超超 on 2017/12/4.
 */
// mock的写法参照 http://mockjs.com

import Mock from 'mockjs'
Mock.mock(new RegExp('/getMenu'), {
  'menus': [{
    'id': '1',
    'name': '系统管理',
    'icon|1': ['el-icon-location', 'el-icon-menu', 'el-icon-setting', 'el-icon-document'],
    'url': '/system',
    'children': [{
      'id': '11',
      'name': '用户管理',
      'url': '/system/user',
    }]
  }, {
    'id': '2',
    'name': 'demo示例',
    'icon|1': ['el-icon-location', 'el-icon-menu', 'el-icon-setting', 'el-icon-document'],
    'url': '/demo'
  }]
})
