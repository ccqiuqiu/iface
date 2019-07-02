/**
 * Created by 熊超超 on 2018/6/21.
 */

import {BaseDao} from './BaseDao'
import Page from '../entity/Page'
import Resource from '../entity/Resource'

const methods = {
  '详情': 'GET',
  '保存': 'PUT',
  '删除': 'DELETE',
  '搜索': 'GET',
}

class PageDao extends BaseDao<Page> {
  constructor() {
    super(Page)
  }
  savePage(page: Page) {
    return this.getManager().transaction(async manager => {
      if (page.id) {
        const oldPage: Page = await manager.findOne(Page, page.id)
        manager.delete(Resource, {url: oldPage.resource})
        manager.delete(Resource, {url: oldPage.resource + '/*'})
      }
      const resources: Resource[] = Object.keys(methods).map((key: string) => {
        const resource: Resource = new Resource()
        resource.url = page.resource + (['详情', '删除'].includes(key) ? '/*' : '')
        resource.name = page.name + ' ' + key
        resource.method = methods[key]
        resource.edit = 2
        return resource
      })
      manager.insert(Resource, resources)
      manager.save(Page, page)
    })
  }
  delPage(id: string) {
    return this.getManager().transaction(async manager => {
      const page: Page = await manager.findOne(Page, id)
      if (page.resource) {
        manager.delete(Resource, {url: page.resource})
        manager.delete(Resource, {url: page.resource + '/*'})
      }
      manager.delete(Page, {id: id})
    })
  }
}

export default new PageDao()
