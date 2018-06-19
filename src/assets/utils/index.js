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
    Vue.prototype.$flatObject = utils.flatObject
    Vue.prototype.$isDate = utils.isDate
    Vue.prototype.$isEmptyObject = utils.isEmptyObject
    Vue.prototype.$dialog = uiUtils.dialog
    Vue.prototype.$alert = uiUtils.alert
    Vue.prototype.$message = uiUtils.message
    Vue.prototype.$confirm = uiUtils.confirm
    Vue.prototype.$hideDialog = uiUtils.hideDialog
    Vue.prototype.$msgbox = uiUtils.msgbox
    Vue.prototype.$toTab = uiUtils.toTab
    Vue.prototype.$get = lsUtils.get
    Vue.prototype.$set = lsUtils.set
    Vue.prototype.$getObj = lsUtils.getObj
    Vue.prototype.$remove = lsUtils.remove
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
