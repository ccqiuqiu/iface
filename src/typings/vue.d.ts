/**
 * Augment the typings of Vue.js
 */
import 'vue'
import {ElMessageBox, ElMessageBoxOptions, MessageBoxData} from 'element-ui/types/message-box'
import {Vue} from 'vue/types/vue'

// 给Vue组件原型上增加的方法定义类型
declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils,
    $c: Constant,
    [propName: string]: any
  }
}

declare type MessageType = 'success' | 'warning' | 'info' | 'error'
// 定义Utils接口， 所有的工具类最好在这个接口定义一下
export interface Utils {
  message: (message: string, success?: boolean|MessageType) => void,
  msgbox: MyElMessageBox,
  confirm: (content: string, title?: string, options?: any) => Promise<boolean>,
  alert: (content: string, title?: string, options?: any) => Promise<boolean>,
  dialog: (title: string, content: any, options?: any) => void,
  hideDialog: () => void
  flatObject: <T extends TT>(source: T[], children?: string) => T[],
  set: (key: string, val: any) => void
  get: (key: string, defaultVal: any) => any,
  remove: (key: string) => void,
  getObj: (key: string, defaultVal: any) => any,
  isDate: (obj: any) => boolean,
  isEmptyObject: (obj: any) => boolean,
  objToArr: (obj: any, labelField?: string, valueField?: string) => any[]
  closeTab: (url?: string) => void,
  [propName: string]: any,
}

interface Constant {
  StatusV: IndexEd,
  StatusK: IndexEd,
  SexV: IndexEd,
  SexK: IndexEd,
  options: {[propName: string]: Array<{label: string, value: string | number}>},
  OptionsDataSource: Array<{label: string, value: string, type: string}>,
  [propName: string]: any
}

interface MyElMessageBox extends ElMessageBox {
  (options: MyElMessageBoxOptions): Promise<MessageBoxData>
}
interface MyElMessageBoxOptions extends ElMessageBoxOptions {
  render?: (h: any) => any
}
