/**
 * Created by 熊超超 on 2018/7/4.
 */
import createBody from './createBody'
import axios from 'axios'
import * as redis from '../../utils/redis'
import {createHash} from 'crypto'
import * as Dao from '../../data/dao/index'
import WXBizDataCrypt from '../../utils/WXBizDataCrypt'

import User from '../../data/entity/User'
import {jwtSecret, jwtExp} from '../config'
import * as jwt from 'jsonwebtoken'

const appId = 'wx4a81740cdf4c1653'
const secret = '1b10beb34347d06dce0cdb9ccc4aac58'
const authUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=$CODE&grant_type=authorization_code` // 授权url
const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}` // 获取接口调用凭据
const apiUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=$access_token&type=jsapi` // 获取 jsapi_ticket ，用于url签名

const weAppId = 'wx2fafc9a75f35ea91'
const weAppSecret = '89913db6c700449eda58f59808b339eb'
const weAppLoginUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${weAppId}&secret=${weAppSecret}&js_code=$CODE&grant_type=authorization_code`

import airPort from '../../utils/airPort'
import * as mock from '../../mock'

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


async function wxReg(ctx) {
  const query: any = ctx.request.body
  const url = weAppLoginUrl.replace('$CODE', query.code)
  const {error, data} = await wxService(url)
  if (data) {
    const pc = new WXBizDataCrypt(weAppId, data.session_key)
    const data2 = pc.decryptData(query.encryptedData , query.iv)
    console.log('解密后 data: ', data2)
    // 注册
    const user = new User()
    user.userName = query.name
    user.password = query.password
    user.openId = data.openid
    if (data2 && data2.unionId) {
      user.unionId = data2.unionId
      user.sex = data2.gender
    }
    const userSaved = await Dao.User.save(user)
    // 自动登录
    const token = await saveUserToRedis(userSaved, data.session_key)
    ctx.body = createBody({token}, true)
  } else {
    ctx.body = createBody('', false, error)
  }

}

async function wxLogin(ctx) {
  const query: any = ctx.request.body
  // 通过用户名密码获取用户
  const user = await Dao.User.findOne({name: query.name, password: query.password})
  if (user) {
    const url = weAppLoginUrl.replace('$CODE', query.code)
    const {error, data} = await wxService(url)
    if (data) {
      // 保存登录信息
      const token = await saveUserToRedis(user, data.session_key)
      ctx.body = createBody({token}, true)
    } else {
      ctx.body = createBody('', false, error)
    }
  } else {
    ctx.body = createBody('', false, '用户名和密码不匹配')
  }
}

// 保存用户信息到redis
async function saveUserToRedis(user, session_key) {
  const token = jwt.sign({data: user}, jwtSecret)
  // 获取用户权限保存redis
  await redis.set(user.id, {user, session_key}, 20 * 24 * 60 * 60) // 20天
  return token
}

// 统一处理微信请求
async function wxService(url) {
  const re = await axios.get(url)
  if (re.status === 200) {
    const data = re.data
    if (data.errcode) {
      return {error: {code: data.errcode, message: data.errmsg}}
    } else {
      return {data}
    }
  }
}

async function getAirPort(ctx) {
  ctx.body = createBody({airPort})
}

async function searchFlight(ctx) {
  ctx.body = createBody(mock.searchFlight.data)
}

export default (routes, prefix) => {
  // 整车物流测试接口
  routes.get(prefix + '/public/oauth2getAccessToken.do', auth)
  routes.post(prefix + '/public/oauth2getSignature.do', signUrl)
  routes.post(prefix + '/public/tms_abnormity_app_save.do', saveApp)
  // 微信小程序测试接口
  routes.post(prefix + '/public/wxReg', wxReg)
  routes.post(prefix + '/public/wxLogin', wxLogin)
  routes.get(prefix + '/weFace/airPort', getAirPort)
  routes.post(prefix + '/weFace/searchFlight', searchFlight)

}
