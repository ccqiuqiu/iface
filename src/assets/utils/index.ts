/**
 * Created by 熊超超 on 2018/4/27.
 */

import * as uiUtils from './uiUtils'
import * as utils from './utils'
import * as $c from './constant'
import lsUtils from './lsUtils'

export default {
  install(Vue: any, $i18n: any): void {
    Vue.prototype.$utils = {...utils, ...uiUtils, ...lsUtils}
    Vue.prototype.$c = $c

    /**
     * 验证资源权限指令
     */
    Vue.directive('auth', {
      bind(el: any, binding: any) {
        if (!uiUtils.hasAuth(binding)) {
          el.parentNode.removeChild(el)
        }
      },
    })
  },
}
