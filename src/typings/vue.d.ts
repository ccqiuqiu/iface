/**
 * Augment the typings of Vue.js
 */
import 'vue'
import {EnumMessageType} from '@utils/constant'
declare module 'vue/types/vue' {
  interface Vue {
    $utils: Utils,
    $c: Constant,
    [propName: string]: any
  }
}

declare type MessageType = EnumMessageType.SUCCESS | EnumMessageType.WARNING | EnumMessageType.INFO | EnumMessageType.ERROR
// 定义Utils接口， 所有的工具类最好在这个接口定义一下
export interface Utils {
  message: (message: string, type?: MessageType) => void,
  flatObject: <T extends TT>(source: T[], children?: string) => T[],
  [propName: string]: any
}

interface Constant {
  [propName: string]: any
}
