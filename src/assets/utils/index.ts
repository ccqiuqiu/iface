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
          // el.parentNode.removeChild(el)
          // 此处不从页面删除，而是使用样式控制隐藏，
          // 是因为项目里面自定义的CRUD页面用的是同一个组件
          // 在这些页面切换的时候，组件不会变化，但资源权限会变化，如果从页面删除了DOM，就没有办法再加回到页面
          el.style.display = uiUtils.hasAuth(binding) ? '' : 'none'
        }
      },
      update(el: any, binding: any) {
        el.style.display = uiUtils.hasAuth(binding) ? '' : 'none'
      },
    })
  },
}
