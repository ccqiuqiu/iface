/**
 * Created by 熊超超 on 2018/5/24.
 */
import {BaseDao} from './BaseDao'
import User from '../entity/User'
import Role from '../entity/Role'
import MenuDao from './Menu'
import RoleDao from './Role'
import Menu from '../entity/Menu'
import Resource from '../entity/Resource'
import {listToTree, sortTree} from '../../utils/index'
import Dashboard from '../entity/Dashboard'
import UserDashboard from '../entity/UserDashboard'

class UserDao extends BaseDao<User> {
  constructor() {
    super(User)
  }

  async findPaged({pageNum = 1, pageSize = 10, ...where}) {
    const repository = this.getRepository()
    const total = await repository.count({where})
    const list = await repository.find({
      where,
      relations: ['roles'],
      skip: pageSize * (pageNum - 1),
      take: pageSize,
    })
    const rows = list.map((user: User) => {
      if (user.roles.length) {
        user.roleIds = user.roles.map((role: Role) => role.id)
      }
      delete user.roles
      return user
    })
    return {total, rows}
  }
  save(user: User): any {
    if (user.roleIds) {
      user.roles = user.roleIds.map((id) => new Role(id))
    }
    return this.getRepository().save(user)
  }
  async findOne(where) {
    const repository = this.getRepository()
    const user = await repository.findOne({
      where,
      relations: ['roles'],
    })
    if (user && user.roles) {
      user.roleIds = user.roles.map((role: Role) => role.id)
      delete user.roles
    }
    return user
  }
  async viewUser(where) {
    const repository = this.getRepository()
    const user = await repository.findOne({
      where,
      relations: ['roles'],
    })
    if (user && user.roles) {
      user.roleIds = user.roles.map((role: Role) => role.id)
      delete user.roles
    }
    return user
  }
  async findUserAuth(userId): Promise<{menus: Menu[], resources: string | Resource[]}> {
    const repository = this.getRepository()
    const user = await repository.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      // .leftJoinAndSelect('role.menus', 'menu')
      // .leftJoinAndSelect('role.resources', 'resource')
      .where('user.id = :id', {id: userId})
      .getOne()
    if (!user) {
      return null
    }
    const auth = {menus: [], resources: null}
    let menus = []
    // 如果是超级管理员，取全部菜单和资源
    if (user.roles.find((role: Role) => role.code === 'admin')) {
      menus = await MenuDao.findTrees()
      auth.resources = 'all'
    } else {
      const roleIds = new Set()
      user.roles.forEach(r => {
        roleIds.add(r.id)
        r.parentId && roleIds.add(r.parentId)
      })
      const mergeRoleIds: string[] = [...roleIds]
      const mergeRoles = await RoleDao.getRepository().createQueryBuilder('role')
        .leftJoinAndSelect('role.menus', 'menu')
        .leftJoinAndSelect('role.resources', 'resource')
        .whereInIds(mergeRoleIds)
        .getMany()
      const resources: Resource[] = []
      mergeRoles.forEach((role: Role) => {
        menus.push(...role.menus)
        resources.push(...role.resources)
      })
      // 去重复
      menus = menus
        .filter((menu: Menu, index) => index === menus.findIndex((menu2: Menu) => menu2.id === menu.id))
      auth.resources = resources
        .filter((resource: Resource, index) => index === resources.findIndex((resource2: Resource) => resource2.id === resource.id))
      // 把菜单转成树
      menus = listToTree(menus, null)
    }
    sortTree(menus)
    auth.menus = menus
    user.roleString = user.roles.map((role: Role) => role.name).join(',')
    delete user.roles
    return auth
  }
  async getUserDashboard(id) {
    const repository = this.getRepository()
    const user = await repository.createQueryBuilder('user')
      .leftJoinAndSelect('user.userDashboards', 'userDashboard')
      .leftJoinAndSelect('userDashboard.dashboard', 'dashboard')
      .where('user.id = :id', {id})
      .orderBy('dashboard.addTime', 'ASC')
      .getOne()
    if (user.userDashboards.length > 0) {
      return user.userDashboards
    }
    // 如果用户没有配置Dashboard，那么显示前8个
    // 实际业务中，可以给Dashboard添加一个字段表示默认选中，当用户没有配置Dashboard的时候，取出默认选中的Dashboard返回
    return await this.getManager().find(Dashboard, {order: {addTime: 'ASC'}, take: 8})
  }
  async saveUserDashboard(userId, userDashboards: UserDashboard[]) {
    // 先删掉
    const user = new User(userId)
    await this.getManager().delete(UserDashboard, {user})
    userDashboards.forEach((ud: UserDashboard) => {
      ud.dashboard = new Dashboard(ud.dashboardId)
      ud.user = user
    })
    return this.getManager().save(UserDashboard, userDashboards)
  }
}

export default new UserDao()
