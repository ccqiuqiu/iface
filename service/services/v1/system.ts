/**
 * Created by 熊超超 on 2018/5/24.
 */
import createBody from './createBody'
import * as Dao from '../../data/dao/index'
import {addParentId} from '../../utils'

// 用户
async function searchUser(ctx) {
  const re = await Dao.User.findPaged(ctx.request.body)
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
  addParentId(re)
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
// 角色
async function searchRole(ctx) {
  const re = await Dao.Role.findPaged(ctx.request.body)
  re.rows = re.rows.filter((role: any) => role.code !== 'admin')
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
// 资源
async function searchResource(ctx) {
  const re = await Dao.Resource.findPaged(ctx.request.body)
  ctx.body = createBody(re)
}

async function saveResource(ctx) {
  await Dao.Resource.save(ctx.request.body)
  ctx.body = createBody()
}
async function delResource(ctx) {
  await Dao.Role.delete(ctx.params.id)
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
  const re = await Dao.Dashboard.findPaged(ctx.request.body)
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

export default (routes: any, prefix: string) => {
  // 用户
  routes.post(prefix + '/page/searchUser', searchUser)
  routes.post(prefix + '/page/saveUser', saveUser)
  routes.post(prefix + '/page/delUser/:id', delUser)
  routes.post(prefix + '/page/getUser/:id', getUser)
  routes.post(prefix + '/page/viewUser/:id', viewUser)
  // 菜单
  routes.post(prefix + '/system/menuTree', menuTree)
  routes.post(prefix + '/page/saveMenu', saveMenu)
  routes.post(prefix + '/system/delMenu/:id', delMenu)
  // 角色
  routes.post(prefix + '/page/searchRole', searchRole)
  routes.post(prefix + '/page/saveRole', saveRole)
  routes.post(prefix + '/page/delRole/:id', delRole)
  routes.post(prefix + '/page/getRole/:id', getRole)
  routes.post(prefix + '/page/viewRole/:id', getRole)
  // 资源
  routes.post(prefix + '/page/searchResource', searchResource)
  routes.post(prefix + '/page/saveResource', saveResource)
  routes.post(prefix + '/page/delResource/:id', delResource)
  routes.post(prefix + '/page/getResource/:id', getResource)
  routes.post(prefix + '/page/viewResource/:id', getResource)
  // Dashboard
  routes.post(prefix + '/page/searchDashboard', searchDashboard)
  routes.post(prefix + '/page/saveDashboard', saveDashboard)
  routes.post(prefix + '/page/delDashboard/:id', delDashboard)
  routes.post(prefix + '/page/getDashboard/:id', getDashboard)
  routes.post(prefix + '/page/viewDashboard/:id', getDashboard)
}
