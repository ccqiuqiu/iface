/**
 * Created by 熊超超 on 2018/4/27.
 */

import * as uiUtils from './uiUtils'
import * as utils from './utils'
// import {EnumMessageType} from '@utils/constant'
import * as $c from './constant'

export default {
  install(Vue: any, $i18n: any): void {
    Vue.prototype.$utils = {...utils, ...uiUtils}
    Vue.prototype.$c = $c
    // Vue.prototype.$enumMessageType = EnumMessageType
  },
}
