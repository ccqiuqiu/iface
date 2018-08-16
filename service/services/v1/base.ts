/**
 * Created by 熊超超 on 2018/7/17.
 */
import createBody from './createBody'
import * as Dao from '../../data/dao/index'
import {mock} from 'mockjs'
import {jwtExp} from '../config'
import * as redis from '../../utils/redis'
import User from '../../data/entity/User'
import {Context} from 'koa'

async function getUserDashboard(ctx: Context) {
  const re = await Dao.User.getUserDashboard(ctx.state.session.user.id)
  ctx.body = createBody(re)
}
async function getAllDashboard(ctx) {
  const re = await Dao.Dashboard.findPaged({pageSize: 0})
  ctx.body = createBody(re.rows)
}
async function saveUserDashboard(ctx: Context) {
  const re = await Dao.User.saveUserDashboard(ctx.state.session.user.id, ctx.request['body'].userDashboards)
  ctx.body = createBody(re)
}
async function newOrder(ctx) {
  ctx.body = createBody({title: '150', link: '/baseData/page/user'})
}
async function userNum(ctx) {
  ctx.body = createBody({title: '18', link: '/baseData/page/user'})
}
async function messageNum(ctx) {
  ctx.body = createBody({title: '14', link: '/baseData/page/user'})
}
async function workNum(ctx) {
  ctx.body = createBody({title: '40%', link: '/baseData/page/user'})
}
async function todoList(ctx) {
  ctx.body = createBody(mock({
    'rows|5': [{
      title: '@ctitle(5, 10)',
      subTitle: '@ctitle(20, 30)',
      url: '/baseData/page/user',
    }],
    'link': '/baseData/page/user',
  }))
}

async function messageList(ctx) {

  const re: any = await Dao.Dashboard.findPaged(ctx.request.body)
  re.columns = [
    {prop: 'name', label: '名称'},
    {prop: 'color', label: '颜色'},
    {prop: 'icon', label: '图标'},
  ],
  ctx.body = createBody(re)
}
async function chartDemo(ctx) {
  ctx.body = createBody({
    data: {
      columns: ['页面', '访问量'],
      rows: [
        { 页面: '首页', 访问量: 100000 },
        { 页面: '列表页a', 访问量: 20000 },
        { 页面: '列表页b', 访问量: 80000 },
        { 页面: '内容页a-1', 访问量: 10000 },
        { 页面: '内容页a-2', 访问量: 10000 },
        { 页面: '内容页b-1', 访问量: 60000 },
        { 页面: '内容页b-2', 访问量: 20000 },
      ],
    },
    settings: {},
  })
}
async function getOptions(ctx) {
  const {code, type} = ctx.request.query
  let options: any = ''
  switch (code) {
    case 'menuTree':
      options = await Dao.Menu.findTrees()
      break
    case 'role':
      const roles = await Dao.Role.find()
      options = {
        columns: [
          {prop: 'name', label: '角色名'},
          {prop: 'code', label: '角色编码'},
        ],
        rows: roles,
      }
      break
    case 'resource':
      const res = await Dao.Resource.find()
      options = {
        columns: [
          {prop: 'id', label: 'ID'},
          {prop: 'name', label: '名称'},
          {prop: 'code', label: '代码'},
          {prop: 'url', label: 'URL', width: '160px'},
        ],
        rows: res,
      }
      break
  }
  ctx.body = createBody(options)
}


async function getAuth(ctx: Context) {
  const userId = ctx.state.session.user.id
  // 更新重新查询一下用户的权限，为了解决用户权限变化后一定要重新登录才能生效的问题
  const user: User = await Dao.User.findOne({id: userId})
  const auth = await Dao.User.findUserAuth(userId)
  await redis.set(user.id, {user, auth}, jwtExp)
  let resources = auth.resources
  if (typeof resources !== 'string') {
    resources = (resources as any[]).map((res: any) => res.url/*.replace(/^\/.*?\/(.*)/, '$1')*/)
  }
  ctx.body = createBody({user, auth: {resources, menus: auth.menus}})
}

async function getPageOptions(ctx) {
  const pageCode = ctx.params.code
  const re = await Dao.Page.findOne({pageCode})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}

async function optionsDemo(ctx) {
  ctx.body = createBody([{label: 'demo1', value : 1}, {label: 'demo2', value : 2}])
}

export default (routes: any, prefix: string) => {
  routes.post(prefix + '/base/getUserDashboard', getUserDashboard)
  routes.post(prefix + '/base/getAllDashboard', getAllDashboard)
  routes.post(prefix + '/base/saveUserDashboard', saveUserDashboard)
  routes.post(prefix + '/base/newOrder', newOrder)
  routes.post(prefix + '/base/userNum', userNum)
  routes.post(prefix + '/base/messageNum', messageNum)
  routes.post(prefix + '/base/workNum', workNum)
  routes.post(prefix + '/base/todoList', todoList)
  routes.post(prefix + '/base/messageList', messageList)
  routes.post(prefix + '/base/chartDemo', chartDemo)
  routes.post(prefix + '/base/getOptions', getOptions)
  routes.post(prefix + '/base/getPageOptions/:code', getPageOptions)
  routes.post(prefix + '/base/optionsDemo', optionsDemo)
  // 获取权限
  routes.post(prefix + '/base/getAuth', getAuth)
}
