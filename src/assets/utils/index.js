/**
 * Created by 熊超超 on 2018/4/27.
 */

import * as uiUtils from './uiUtils'
import * as utils from './utils'
import * as $c from './constant'
import lsUtils from './lsUtils'

export default {
  install (Vue, $i18n) {
    Vue.prototype.$utils = {...utils, ...uiUtils, ...lsUtils}
    Vue.prototype.$c = $c

    /**
     * 验证资源权限指令
     */
    Vue.directive('auth', {
      bind (el, binding) {
        if (!uiUtils.hasAuth(binding)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}
