/**
 * Created by 熊超超 on 2018/6/28.
 */

import {Context} from 'koa'

/**
 * 将单层级的数组转为树形结构的数组
 * @param source 源数组
 * @param parentIdVal 上级节点key的值
 * @param id 节点的key字段
 * @param parentId  表示上级节点的字段
 * @returns []
 */
export const listToTree = (source: any[], parentIdVal: any = undefined, id: string = 'id', parentId: string = '_parentId'): any[] => {
  const target = source.filter(s => s[parentId] === parentIdVal)
  target.forEach(t => {
    const children = listToTree(source, t[id], id, parentId)
    if (children.length) {
      t.children = children
    }
  })
  return target
}

export const sortTree = (source: any[], shotField: string = 'sort') => {
  source.sort((a: any, b: any) => a[shotField] - b[shotField])
  source.forEach((item: any) => {
    if (item.children) {
      sortTree(item.children)
    }
  })
}

export const addParentId = (source: any[], parentId: any = null): void => {
  source.forEach((item: any) => {
    item.parentId = parentId
    if (item.children) {
      addParentId(item.children, item.id)
    }
  })
}
export const hasAuth = (ctx: Context): boolean => {
  // 处理url url的格式必需为  /版本/模块/名称[/params|?query]
  let url = ctx.request.url
  // // 去除接口版本号  /版本/模块/名称[/params|?query] => /模块/名称[/params|?query]
  // url = url.replace(/^(\/.*?\/)(.*)/, '/$2')
  // // 去除query /模块/名称[/params|?query]  => /模块/名称[/params]
  // url = url.replace(/^(\/.*?)(\?.*)/, '$1')
  // // 去除params /模块/名称[/params] =>  /模块/名称/*
  // url = url.replace(/^(\/.*?\/)(.*?\/)(.*)/, '$1$2*')

  // 处理url url的格式必需为  /版本/模块/名称[/params|?query]  => /模块/名称
  url = url.replace(/^(\/.*?)(\/.*?)(\/[^\/|\?]*).*/, '$2$3')
  // '/base'开头的url是只要登录了就能访问的，比如用户的权限、站内通知、首页的一些数据等
  if (url.indexOf('/base/') !== 0) {
    // 白名单
    const whiteList: string[] = []
    // 不在白名单的url要校验资源权限
    if (!whiteList.includes(url)) {
      const resources = ctx.session.auth.resources
      if (resources !== 'all') {
        return !!resources.find((role: any) => role.url === url)
      }
    }
  }
  return true
}