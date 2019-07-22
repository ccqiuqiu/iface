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
    'list|5-10': [{
      'id|+1': 5,
      'name': '产品@id',
      'nameEn': 'product@id',
      'openType': 3,
      'url': '@url',
      'feeType|1': [1, 2],
      'status|1': [0, 1],
      'icon|1': ['system','chart','color','date','table'],
      'remark': '@cword(30,100)',
    }]
  }).list)
}

async function getMyProduct(ctx) {
  ctx.body = createBody(Mock.mock({
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
  }).list)
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
}
