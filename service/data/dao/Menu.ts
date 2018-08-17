/**
 * Created by 熊超超 on 2018/5/24.
 */
import {BaseDao} from './BaseDao'
import Menu from '../entity/Menu'

class UserDao extends BaseDao<Menu> {
  constructor() {
    super(Menu)
  }
  findTrees() {
    const manager = this.getManager()
    return manager.getTreeRepository(Menu).findTrees()
  }
  async saveMenu(menu) {
    const manager = this.getManager()
    if (menu.parentId) {
      const parentMenu = new Menu(menu.parentId)
      menu.parent = parentMenu
      menu._parentId = menu.parentId
    } else {
      menu.parent = null
    }
    if (!menu.sort) {
      // 顺序, 同级菜单最大sort + 1
      const maxSort: Menu = await manager.findOne<Menu>(this.entityClass, {
        where: {parent: menu.parent},
        order: {sort: 'DESC'},
      })
      menu.sort = maxSort ? maxSort.sort + 1 : 1
    }
    return manager.save(this.entityClass, menu)
  }
  async sortMenu(params: {sourceId, targetId, location: 'before' | 'after' | 'inner'}) {
    const manager = this.getManager()
    const source: Menu = await manager.findOne<Menu>(this.entityClass, params.sourceId)
    const target: Menu = await manager.findOne<Menu>(this.entityClass, params.targetId)
    const location = params.location
    // 如果是拖动到目标里面，那么顺序取目标菜单的子菜单的sort最大值+1
    if (location === 'inner') {
      const maxSort: Menu = await manager.findOne<Menu>(this.entityClass, {
        where: {_parentId: target.id},
        order: {sort: 'DESC'},
      })
      source.sort = maxSort ? maxSort.sort + 1 : 1
      source.parent = target
      manager.save(this.entityClass, source)
    } else {
      // 如果拖动到目标的前面或者后面，那除了需要改变源菜单的sort，目标菜单后面的所有同级菜单的sort都要+1
      const menus: Menu[] = await manager.createQueryBuilder<Menu>(this.entityClass, 'm')
        .where('m.sort > :sort', { sort: target.sort})
        .andWhere('m._parentId = :_parentId', {_parentId: target._parentId})
        .andWhere('m.id != :id', {id: source.id})
        .getMany()
      if (location === 'before') {
        source.sort = target.sort
        menus.unshift(target)
      } else {
        source.sort = target.sort + 1
      }
      source.parent = new Menu(target._parentId)
      menus.forEach((m: Menu) => m.sort++)
      menus.push(source)
      return manager.save(menus)
    }
    return null
  }
}

export default new UserDao()
