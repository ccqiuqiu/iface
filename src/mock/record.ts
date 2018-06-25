/**
 * Created by 熊超超 on 2017/12/4.
 */
// mock的写法参照 http://mockjs.com

import Mock from 'mockjs'

function getQueryString(url: string, name: string) {
  const reg: RegExp = new RegExp('(.*/?)&?' + name + '=([^&]*)(&|$)', 'i')
  const r: any = url.match(reg)
  if (r) { return unescape(r[2]) }
  return ''
}

Mock.setup({
  timeout: '300-600',
})
