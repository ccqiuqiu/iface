/**
 * Augment the typings of Vue.js
 */
import 'vue'
import {ElMessageBox, ElMessageBoxOptions, MessageBoxData} from 'element-ui/types/message-box'
import index from "@utils/index";

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
  dialog: (title: string, content: any, options?: any, inside?: boolean) => void,
  dialogInside: (title: string, content: any, options?: any, inside?: boolean) => void,
  hideDialog: (inside?: boolean) => void
  flatObject: <T extends TT>(source: T[], children?: string) => T[],
  set: (key: string, val: any) => void
  get: (key: string, defaultVal: any) => any,
  remove: (key: string) => void,
  getObj: (key: string, defaultVal: any) => any,
  [propName: string]: any
}

interface Constant {
  [propName: string]: any
}

interface MyElMessageBox extends ElMessageBox {
  (options: MyElMessageBoxOptions): Promise<MessageBoxData>
}
interface MyElMessageBoxOptions extends ElMessageBoxOptions {
  render?: (h: any) => any
}
