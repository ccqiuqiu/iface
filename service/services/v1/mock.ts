/**
 * Created by 熊超超 on 2018/5/24.
 */
import createBody from './createBody'
import * as Mock from 'mockjs'

async function searchResBag(ctx) {
  ctx.body = createBody(Mock.mock({
    'list|10': [{
      'id|+1': 1,
      'name': '资源包@id',
      'unit': '@cword',
      'remark': '@cword(5,10)',
      'items|2-5': [{
        'num|1': [1000, 10000, 100000, 1000000, 10000000],
        'price|10-1000.2': 1
      }]
    }],
    total: '@integer(30, 50)'
  }))
}
async function searchProduct(ctx) {
  ctx.body = createBody(Mock.mock({
    'list|10': [{
      'id|+1': 1,
      'name': '产品@id',
      'nameEn': 'product@id',
      'openType': 3,
      'url': '@url',
      'feeType|1': [1, 2],
      'status|1': [0, 1],
      'remark': '@cword(5,10)',

    }],
    total: '@integer(30, 50)'
  }))
}
async function resBagAll(ctx) {
  ctx.body = createBody(Mock.mock({
    'list|10': [{
      'id|+1': 1,
      'name': '资源包@id',
    }]
  }).list)
}
async function saveProduct(ctx) {
  ctx.body = createBody()
}
async function getProduct(ctx) {
  ctx.body = createBody(Mock.mock(
  {
    'id|+1': 1,
    'name': '产品@id',
    'nameEn': 'prodict@id',
    'url': '@url',
    'feeType|1': [1, 2],
    'status|1': [0, 1],
    'openType': 3,
    'remark': '@cword(5,10)',
    'resBagIds': '@range(1, 10, 2)',
    'feeList|1-3': [{
      'verName|1': [0,1,2],
      'priceMonth|10-1000.2': 0,
      'priceYear|10-1000.2': 0,
    }],
  }))
}

async function getAllProduct(ctx) {
  ctx.body = createBody(Mock.mock({
    list: [{
      id : 11,
      name: '流程管理平台',
      nameEn: 'VFDP',
      url: '',
      feeType: 1,
      status: 1,
      icon: 'system',
      userNum: 2,
      openType: 3,
      remark: 'BPM流程设计、表单设计、流程审批权限控制、流程流转控制',
    }]
  }).list)
}

async function getMyProduct(ctx) {
  let data = Mock.mock({
    'list|5-10': [{
      'id|+1': 1,
      'name': '产品@id',
      'nameEn': 'product@id',
      'url': '@url',
      'feeType|1': [1, 2],
      'openType': 3,
      'status|1': [0, 1],
      'remark': '@cword(30,100)',
      'icon|1': ['system','chart','color','date','table'],
      'userNum': '@integer(1, 3)',
      'items|1-3': [{
        'bagId|+1': 1,
        'verName|1': [0,1,2],
        'bagName': '资源包@bagId',
        'maxUser': '@integer(3, 10)',
        'maxNum|1': [1000, 10000, 100000, 1000000, 10000000],
        'useNum': '@integer(100,1000)',
        'expireTime|1': ['', '2018-01-01 12:00:00', '2019-12-24 12:00:00', '2019-08-01 12:00:00'],
      }]
    }]
  }).list
  data = [
    {
      id : 30,
      name: '用户中心',
      nameEn: 'UC',
      url: '',
      feeType: 1,
      status: 1,
      icon: 'system',
      userNum: 2,
      openType: 3,
      items: [
        {
          bagId: 40,
          verName: 0,
          maxUser: 5,
          expireTime: '',
        }
      ]
    },
    {
      id : 31,
      name: '工程项目管理平台',
      nameEn: 'PMS',
      url: 'http://gcpm.oppein.com',
      feeType: 1,
      status: 1,
      icon: 'system',
      userNum: 3,
      openType: 3,
      items: [
        {
          bagId: 41,
          verName: 0,
          maxUser: 10,
          expireTime: '',
        }
      ]
    },
    {
      id : 32,
      name: '单点登录系统',
      nameEn: 'SSO',
      url: 'https://opsso.oppein.com',
      feeType: 1,
      status: 1,
      icon: 'system',
      userNum: 50,
      openType: 3,
      items: [
        {
          bagId: 41,
          verName: 1,
          maxUser: 10,
          expireTime: '2020-11-02 12:00:00',
        }
      ]
    },
    {
      id : 33,
      name: '传单系统',
      nameEn: 'MTDS',
      url: 'https://opsso.oppein.com',
      feeType: 1,
      status: 1,
      icon: 'system',
      userNum: 50,
      openType: 3,
      items: [
        {
          bagId: 41,
          verName: 2,
          maxUser: 10,
          expireTime: '2019-8-02 12:00:00',
        }
      ]
    }
  ]
  ctx.body = createBody(data)
}

async function savePerson(ctx) {
  ctx.body = createBody()
}
async function getProductPerson(ctx) {
  ctx.body = createBody(Mock.mock({
    'list|3': [{
      'id|+1': 1,
      'name': '客户人员@id',
      'isEntry': 1
    }]
  }))
}
async function getAllPerson(ctx) {
  ctx.body = createBody(Mock.mock({
    'list|20': [{
      'id|+1': 1,
      'name': '客户人员@id',
    }]
  }))
}

export default (routes, prefix) => {
  routes.get(prefix + '/system/resBag', searchResBag)
  routes.get(prefix + '/system/resBag/all', resBagAll)
  routes.get(prefix + '/system/product', searchProduct)
  routes.post(prefix + '/system/product', saveProduct)
  routes.put(prefix + '/system/product', saveProduct)
  routes.get(prefix + '/system/product/all', getAllProduct)
  routes.get(prefix + '/system/product/my', getMyProduct)
  routes.get(prefix + '/system/product/:id', getProduct)
  routes.get(prefix + '/system/product/person/:id', getProductPerson)
  routes.get(prefix + '/system/person/all', getAllPerson)
  routes.put(prefix + '/system/product/person', savePerson)
}
