/**
 * Created by 熊超超 on 2018/7/25.
 */
const Koa = require('koa')
const koaBody = require('koa-bodyparser')
const cors = require('kcors')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

let cache = {}

const app = new Koa()
app.use(cors({credentials: true}))
app.use(koaBody())

app.use(async (ctx) => {
  if (ctx.request.url === '/') {
    const data = ctx.request.body
    cache[data.url] = data.data
    ctx.body = Object.keys(cache)
  } else if (ctx.request.url === '/save') {
    // 保存数据
    try {
      let text = 'import Mock from \'mockjs\'\n\n'
      text += 'Mock.setup({\n' + '  timeout: \'300-600\',\n' + '})\n\n'
      for (let [key, value] of Object.entries(cache)) {
        const data = {data: value, success: true}
        let url = key.replace(/^(\/.*?)(\?.*)/, '$1')
        if (!/^\/.*?\/page\/getPage/.test(url)) {
          url = url.replace(/^(\/.*?\/)(.*?\/)(.*?\/)(.*)/, '$1$2$3')
        }
        text += 'Mock.mock(new RegExp(\'' + url + '\'), ' + JSON.stringify(data) + ')'
        text += '\n'
      }
      fs.writeFileSync(resolve('./mock.js'), text)
      cache = {}
      ctx.body = 'ok'
    } catch (e) {
      ctx.body = e.message
    }
  }
})

app.listen(3001)
console.log('录制服务启动成功')
