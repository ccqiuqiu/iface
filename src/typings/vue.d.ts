/**
 * Augment the typings of Vue.js
 */
import 'vue'
import {ElMessageBox, ElMessageBoxOptions, MessageBoxData} from 'element-ui/types/message-box'
import {DefaultComputed, DefaultData, DefaultMethods, DefaultProps, PropsDefinition} from 'vue/types/options'
import {Vue} from 'vue/types/vue'

// 给Vue组件原型上增加的方法定义类型
declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils,
    $c: Constant,
    [propName: string]: any
  }
}
// JSX使用大写字母开头的自定义的组件时，自定义的属性和方法会报类似这样的异常 Property 'user' does not exist on type 'ComponentOptions<Vue, DefaultData<Vue>..'
// 所以扩展ComponentOptions接口支持任意的属性和方法
declare module 'vue/types/options' {
  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps> {
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
