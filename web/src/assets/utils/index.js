/**
 * Created by 熊超超 on 2018/4/27.
 */

import constant from './constant'
import utils from './uiUtils'
import ls from './lsUtils'
const env = {
  ssoUrl: process.env.VUE_APP_SSO_URL
}

export { utils, ls }

export default {
  install (Vue, $i18n) {
    Vue.prototype.$utils = utils
    Vue.prototype.$c = constant
    Vue.prototype.$ls = ls
    Vue.prototype.$bus = utils.bus
    Vue.prototype.$env = env

    /**
     * 验证资源权限指令
     */
    Vue.directive('auth', {
      bind (el, binding) {
        if (!utils.hasAuth(binding)) {
          // el.parentNode.removeChild(el)
          // 此处不从页面删除，而是使用样式控制隐藏，
          // 是因为项目里面自定义的CRUD页面用的是同一个组件
          // 在这些页面切换的时候，组件不会变化，但资源权限会变化，如果从页面删除了DOM，就没有办法再加回到页面
          el.style.display = utils.hasAuth(binding) ? '' : 'none'
        }
      },
      update (el, binding) {
        el.style.display = utils.hasAuth(binding) ? '' : 'none'
      }
    })
  }
}
