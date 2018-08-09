/**
 * Created by 熊超超 on 2018/6/21.
 */
import createBody from './createBody'
import * as Dao from '../../data/dao'

async function searchPage(ctx) {
  const params = ctx.request.body
  const re = await Dao.Page.findPaged(params)
  ctx.body = createBody(re)
}
async function getPage(ctx) {
  const pageCode = ctx.params.code
  const re = await Dao.Page.findOne({pageCode})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
async function savePage(ctx) {
  const params = ctx.request.body
  await Dao.Page.save(params)
  ctx.body = createBody()
}
async function delPage(ctx) {
  await Dao.Page.delete(ctx.params.id)
  ctx.body = createBody()
}

export default (routes: any, prefix: string) => {
  routes.post(prefix + '/page/searchPage', searchPage)
  routes.post(prefix + '/page/getPage/:code', getPage)
  routes.post(prefix + '/page/delPage/:id', delPage)
  routes.post(prefix + '/page/savePage', savePage)
}
