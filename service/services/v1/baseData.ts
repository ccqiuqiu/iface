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
  const code = ctx.params.code
  const re = await Dao.Page.findOne({code})
  if (re) {
    ctx.body = createBody(re)
  } else {
    ctx.body = createBody(null, false, '暂无数据')
  }
}
async function savePage(ctx) {
  const params = ctx.request.body
  await Dao.Page.savePage(params)
  ctx.body = createBody()
}
async function delPage(ctx) {
  await Dao.Page.delPage(ctx.params.id)
  ctx.body = createBody()
}

export default (routes, prefix) => {
  routes.get(prefix + '/baseData/page', searchPage)
  routes.get(prefix + '/baseData/page/:code', getPage)
  routes.delete(prefix + '/baseData/page/:id', delPage)
  routes.put(prefix + '/baseData/page', savePage)
}
