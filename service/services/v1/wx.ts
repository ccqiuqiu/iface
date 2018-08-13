/**
 * Created by 熊超超 on 2018/7/4.
 */
import createBody from './createBody'
import axios from 'axios'
import * as redis from '../../utils/redis'
import {createHash} from 'crypto'

const appId = 'wx4a81740cdf4c1653'
const secret = '1b10beb34347d06dce0cdb9ccc4aac58'
const authUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=$CODE&grant_type=authorization_code` // 授权url
const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}` // 获取接口调用凭据
const apiUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$access_token&type=jsapi` // 获取 jsapi_ticket ，用于url签名

async function auth(ctx) {
  const code = ctx.request.query.code
  const url = authUrl.replace('$CODE', code)
  const re = await axios.get(url)
  if (re.status === 200) {
    const data = re.data
    if (data.errcode) {
      // ctx.body = createBody('', false, {code: data.errcode, message: data.errmsg})
      ctx.body = {status: data.errcode, message: data.errmsg}
    } else {
      // ctx.body = createBody({openid: data.openid}, true)
      ctx.body = {
        status: 200,
        detail: {openid: data.openid},
      }
    }
  } else {
    ctx.body = createBody('', false, '服务端异常')
  }
}

async function signUrl(ctx) {
  let jsapiTicket = await redis.get('jsapi_ticket')
  // 如果jsapi_ticket过期
  if (!jsapiTicket) {
    const re = await axios.get(tokenUrl)
    if (!re.data.errcode) {
      if (re.data.access_token) {
        const access_token = re.data.access_token
        redis.set('access_token', re.data.access_token, re.data.expires_in)
        const re2 = await axios.get(apiUrl.replace('$access_token', access_token))
        if (re2.data.errcode === 0) {
          jsapiTicket = re2.data.ticket
          redis.set('jsapiTicket', re2.data.ticket, re2.data.expires_in)
        } else {
          // ctx.body = createBody('', false, {code: re2.data.errcode, message: re2.data.errmsg})
          ctx.body = {status: re2.data.errcode, message: re2.data.errmsg}
        }
      }
    } else {
      // ctx.body = createBody('', false, {code: re.data.errcode, message: re.data.errmsg})
      ctx.body = {status: re.data.errcode, message: re.data.errmsg}
    }
  }
  // url 签名
  const body = ctx.request.body
  const str = `jsapi_ticket=${jsapiTicket}&noncestr=${body.nonceStr}&timestamp=${body.timestamp}&url=${body.url}`
  const hash = createHash('SHA1')
  hash.update(str)
  // ctx.body = createBody(hash.digest('hex'), true)
  ctx.body = {
    status: 200,
    detail: {signature: hash.digest('hex')},
  }
}

async function saveApp(ctx) {
  console.log(ctx.request.body)
}

export default (routes: any, prefix: string) => {
  routes.get(prefix + '/public/oauth2getAccessToken.do', auth)
  routes.post(prefix + '/public/oauth2getSignature.do', signUrl)
  routes.post(prefix + '/public/tms_abnormity_app_save.do', saveApp)
}
