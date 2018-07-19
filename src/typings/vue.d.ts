/**
 * Augment the typings of Vue.js
 */
import 'vue'
import {ElMessageBox, ElMessageBoxOptions, MessageBoxData} from 'element-ui/types/message-box'
import {Vue} from 'vue/types/vue'
import Constant from '@utils/constant'
import {UiUtils} from '@utils/uiUtils'

// 给Vue组件原型上增加的方法定义类型
declare module 'vue/types/vue' {
  interface Vue {
    $utils: UiUtils,
    $c: Constant,
    [propName: string]: any
  }
}

declare type MessageType = 'success' | 'warning' | 'info' | 'error'

declare interface MyElMessageBox extends ElMessageBox {
  (options: MyElMessageBoxOptions): Promise<MessageBoxData>
}
declare interface MyElMessageBoxOptions extends ElMessageBoxOptions {
  render?: (h: any) => any
}
