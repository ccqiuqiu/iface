/**
 * Created by 熊超超 on 2018/5/24.
 */
import {BaseDao} from './BaseDao'
import Role from '../entity/Role'
import Menu from '../entity/Menu'
import Resource from '../entity/Resource'

class RoleDao extends BaseDao<Role> {
  constructor() {
    super(Role)
  }
  save(role: Role): any {
    if (role.menuIds) {
      role.menus = role.menuIds.map((id) => new Menu(id))
    }
    if (role.resourceIds) {
      role.resources = role.resourceIds.map((id) => new Resource(id))
    }
    return super.getRepository().save(role)
  }

  async findOne(where) {
    const repository = this.getRepository()
    const role: Role = await repository.findOne({
      where,
      relations: ['menus', 'resources'],
    })
    if (role && role.menus) {
      role.menuIds = role.menus.map((menu: Menu) => menu.id)
      delete role.menus
    }
    if (role && role.resources) {
      role.resourceIds = role.resources.map((res: Resource) => res.id)
      delete role.resources
    }
    return role
  }
}

export default new RoleDao()
