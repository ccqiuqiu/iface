/**
 * Created by 熊超超 on 2018/5/24.
 */
import createBody from './createBody'
import * as Dao from '../../data/dao/index'
import {addParentId} from '../../utils'
import {Context} from 'koa'
import User from '../../data/entity/User'
import * as redis from '../../utils/redis'
import {jwtExp} from '../config'
import Resource from '../../data/entity/Resource'


async function getAuth(ctx: Context) {
  const userId = ctx.state.session.user.id
  // 更新重新查询一下用户的权限，为了解决用户权限变化后一定要重新登录才能生效的问题
  const user: User = await Dao.User.findOne({id: userId})
  const auth = await Dao.User.findUserAuth(userId)
  await redis.set(user.id, {user, auth}, jwtExp)
  let userResources = auth.resources
  let resources: any = []
  if (typeof userResources !== 'string') {
    resources = (userResources as Resource[]).map((res) => res.method + '-' + res.url)
  } else {
    resources = userResources
  }
  ctx.body = createBody({user, auth: {resources, menus: auth.menus}})
}

// 用户
async function searchUser(ctx) {
  const re = await Dao.User.findPaged(ctx.query)
  ctx.body = createBody(re)
}

async function saveUser(ctx) {
  const user = ctx.request.body
  await Dao.User.save(user)
  ctx.body = createBody()
}
async function delUser(ctx) {
  await Dao.User.delete(ctx.params.id)
  ctx.body = createBody()
}
async function getUser(ctx) {
  const id = ctx.params.id
  const re = await Dao.User.findOne({id})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
async function viewUser(ctx) {
  const id = ctx.params.id
  const re = await Dao.User.viewUser({id})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
// 菜单
async function menuTree(ctx) {
  const re = await Dao.Menu.findTrees()
  addParentId(re, null, 'sort')
  ctx.body = createBody(re)
}

async function saveMenu(ctx) {
  const menu = ctx.request.body
  const re = await Dao.Menu.saveMenu(menu)
  ctx.body = createBody(re)
}
async function delMenu(ctx) {
  await Dao.Menu.delete(ctx.params.id)
  ctx.body = createBody()
}
async function getMenu(ctx) {
  const id = ctx.params.id
  const re = await Dao.Menu.findOne({id})
  if (re) {
    re['parentId'] = re._parentId
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
// 角色
async function searchRole(ctx) {
  const re = await Dao.Role.findPaged({...ctx.query, parentId: null}, {relations: ['children']})
  re.rows = re.rows.filter((role: any) => role.code !== 'admin')
  re.total--
  ctx.body = createBody(re)
}

async function saveRole(ctx) {
  await Dao.Role.save(ctx.request.body)
  ctx.body = createBody()
}
async function delRole(ctx) {
  await Dao.Role.delete(ctx.params.id)
  ctx.body = createBody()
}
async function getRole(ctx) {
  const id = ctx.params.id
  const re = await Dao.Role.findOne({id})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
async function getRoleGroup(ctx) {
  const re = await Dao.Role.find({where: {isGroup: 1}})
  console.log(re)
  ctx.body = createBody(re)
}
async function getRoleChildren(ctx) {
  const re = await Dao.Role.find({parentId: ctx.params.id})
  ctx.body = createBody(re)
}
// 资源
async function searchResource(ctx) {
  const re = await Dao.Resource.findPaged(ctx.query)
  ctx.body = createBody(re)
}

async function saveResource(ctx) {
  await Dao.Resource.save(ctx.request.body)
  ctx.body = createBody()
}
async function delResource(ctx) {
  await Dao.Resource.delete(ctx.params.id)
  ctx.body = createBody()
}
async function getResource(ctx) {
  const id = ctx.params.id
  const re = await Dao.Resource.findOne({id})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
// Dashboard
async function searchDashboard(ctx) {
  const re = await Dao.Dashboard.findPaged(ctx.query)
  ctx.body = createBody(re)
}
async function saveDashboard(ctx) {
  await Dao.Dashboard.save(ctx.request.body)
  ctx.body = createBody()
}
async function delDashboard(ctx) {
  await Dao.Dashboard.delete(ctx.params.id)
  ctx.body = createBody()
}
async function getDashboard(ctx) {
  const id = ctx.params.id
  const re = await Dao.Dashboard.findOne({id})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
async function sortMenu(ctx) {
  await Dao.Menu.sortMenu(ctx.request.body)
  ctx.body = createBody()
}

export default (routes, prefix) => {
  // 获取权限
  routes.get(prefix + '/system/auth', getAuth)
  // 用户
  routes.get(prefix + '/system/user', searchUser)
  routes.put(prefix + '/system/user', saveUser)
  routes.delete(prefix + '/system/user/:id', delUser)
  routes.get(prefix + '/system/user/:id', getUser)
  // 菜单
  routes.get(prefix + '/system/menuTree', menuTree)
  routes.get(prefix + '/system/menu', menuTree)
  routes.put(prefix + '/system/menu', saveMenu)
  routes.post(prefix + '/system/menu', saveMenu)
  routes.delete(prefix + '/system/menu/:id', delMenu)
  routes.get(prefix + '/system/menu/:id', getMenu)
  routes.put(prefix + '/system/sortMenu', sortMenu)
  // 角色
  routes.get(prefix + '/system/role', searchRole)
  routes.put(prefix + '/system/role', saveRole)
  routes.post(prefix + '/system/role', saveRole)
  routes.delete(prefix + '/system/role/:id', delRole)
  routes.get(prefix + '/system/roleGroup', getRoleGroup)
  routes.get(prefix + '/system/role/:id', getRole)
  routes.get(prefix + '/system/roleChildren/:id', getRoleChildren)
  // 资源
  routes.get(prefix + '/system/resource', searchResource)
  routes.put(prefix + '/system/resource', saveResource)
  routes.delete(prefix + '/system/resource/:id', delResource)
  routes.get(prefix + '/system/resource/:id', getResource)
  // Dashboard
  routes.get(prefix + '/system/dashboard', searchDashboard)
  routes.put(prefix + '/system/dashboard', saveDashboard)
  routes.del(prefix + '/system/dashboard/:id', delDashboard)
  routes.get(prefix + '/system/dashboard/:id', getDashboard)
}
